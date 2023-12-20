import puppeteer from "puppeteer";
import moment from "moment";
import esMain from "es-main";

const api_url = "https://cubingusa.org/async/state_rankings";

let browser, page;

// Browser and page for webscraping
async function openBrowser() {
    browser = await puppeteer.launch({ headless: "new" });
    page = await browser.newPage();
}

// Closing browser after use
async function closeBrowser() {
    await browser.close();
}

/* Function to get the top 100 in a region for any particular event */
async function getRegionTop100(eventId, useAverage) {
    const getStateTop100 = async (stateId) => {
        await page.goto(`${api_url}/${eventId}/${stateId}/${useAverage}`, {
            waitUntil: "domcontentloaded"
        });

        const rankings = await page.evaluate(() => {
            const stateRanks = [];

            // fetching competitors from the divs with class "row"
            const rows = Array.from(document.querySelectorAll(".row"));

            // iterating through rows and getting person, rank, and time
            for (let i = 0; i < rows.length; i++) {
                const person_elem =
                    rows[i].querySelector(".person-col").children[0];
                stateRanks.push({
                    person: person_elem.textContent.trim(),
                    rank: rows[i].querySelector(".rank-col").textContent.trim(),
                    time: rows[i].querySelector(".time-col").textContent.trim(),
                    link: person_elem.attributes.getNamedItem("href").value
                });
            }

            return stateRanks;
        });

        return rankings;
    };

    const cali_array = await getStateTop100("ca");
    const nevada_array = await getStateTop100("nv");
    const hawaii_array = await getStateTop100("hi");

    const region_array = [];

    // show top 100 people at most for rankings
    let total_people = Math.min(
        cali_array.length + nevada_array.length + hawaii_array.length,
        100
    );
    let i = 0,
        j = 0,
        k = 0;

    for (let x = 0; x < total_people; x++) {
        let resArray = [];

        if (i < cali_array.length) {
            resArray.push(cali_array[i].time);
        } else {
            resArray.push(undefined);
        }

        if (j < nevada_array.length) {
            resArray.push(nevada_array[j].time);
        } else {
            resArray.push(undefined);
        }

        if (k < hawaii_array.length) {
            resArray.push(hawaii_array[k].time);
        } else {
            resArray.push(undefined);
        }

        let entry = [x + 1];
        let bestResult = findBestResult(resArray, eventId === "333mbf");

        if (bestResult === 0) {
            entry.push(
                cali_array[i].person,
                cali_array[i].time,
                "California",
                cali_array[i].link
            );
            i++;
        } else if (bestResult === 1) {
            entry.push(
                nevada_array[j].person,
                nevada_array[j].time,
                "Nevada",
                nevada_array[j].link
            );
            j++;
        } else {
            entry.push(
                hawaii_array[k].person,
                hawaii_array[k].time,
                "Hawaii",
                hawaii_array[k].link
            );
            k++;
        }

        if (x > 0 && entry[2] === region_array[x - 1][2]) {
            entry[0] = region_array[x - 1][0];
        }

        region_array.push(entry);
    }

    // return array of rankings for west coast region
    return region_array;
}

function getTimeFromString(str) {
    let time = moment(str, "s.SS");
    return time.seconds() + time.millisecond() / 1000;
}

// Returns negative if result 1 is better than result 2, positive if result 2 is better, 0 for ties
function compareResults(res1, res2, isMulti) {
    const compareTime = (time1, time2) => {
        if (
            time1.includes(":") &&
            time1.includes(".") &&
            time2.includes(":") &&
            !time2.includes(".")
        ) {
            return -1;
        } else if (
            time1.includes(":") &&
            !time1.includes(".") &&
            time2.includes(":") &&
            time2.includes(".")
        ) {
            return 1;
        }
        if (time1.length < time2.length) {
            return -1;
        } else if (time1.length > time2.length) {
            return 1;
        } else {
            return time1.localeCompare(time2, undefined, { numeric: true });
        }
    };

    if (res1 === undefined) {
        return 1;
    } else if (res2 === undefined) {
        return -1;
    } else if (isMulti) {
        let multi1 = res1.split(" ");
        let multi1Cubes = multi1[0].split("/");
        let multi1Points =
            2 * parseInt(multi1Cubes[0]) - parseInt(multi1Cubes[1]);
        let multi2 = res2.split(" ");
        let multi2Cubes = multi2[0].split("/");
        let multi2Points =
            2 * parseInt(multi2Cubes[0]) - parseInt(multi2Cubes[1]);

        if (multi1Points > multi2Points) {
            return -1;
        } else if (multi1Points < multi2Points) {
            return 1;
        } else {
            if (multi1[1] !== multi2[1]) {
                return multi1[1].localeCompare(multi2[1], undefined, {
                    numeric: true
                });
            } else {
                let multi1DNFs =
                    parseInt(multi1Cubes[1]) - parseInt(multi1Cubes[0]);
                let multi2DNFs =
                    parseInt(multi2Cubes[1]) - parseInt(multi2Cubes[0]);
                return multi1DNFs - multi2DNFs;
            }
        }
    } else {
        return compareTime(res1, res2);
    }
}

// Compares results in an array and finds index of best one
function findBestResult(resArray, isMulti) {
    let i = 0;
    for (let j = 1; j < resArray.length; j++) {
        let result = compareResults(resArray[i], resArray[j], isMulti);
        if (result > 0) {
            i = j;
        }
    }
    return i;
}

// Only run this code if this module is called directly
if (esMain(import.meta)) {
    await openBrowser();
    const result = await getRegionTop100("555bf", "0");
    console.log(result);
    await closeBrowser();

    //console.log(findBestResult(["62/65 57:47", "14/14 59:48", "13/14 53:47"], true));
}

export default { getRegionTop100, openBrowser, closeBrowser };
