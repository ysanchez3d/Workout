// 👇️ if using ES6 Imports uncomment line below
// import {readFileSync, promises as fsPromises} from 'fs';
const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
// function syncReadFile(filename) {
//   const contents = readFileSync(filename, 'utf-8');

//   const arr = contents.split(/\r?\n/);

//   console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

//   return arr;
// }

// syncReadFile('./data.txt');

// --------------------------------------------------------------

// ✅ read file ASYNCHRONOUSLY
async function asyncReadFile(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    // console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']
    var finalData = parseData(arr)
    console.log(JSON.stringify(finalData));
    
  } catch (err) {
    console.log(err);
  }
}

function parseData(dataArr) {
    var videos = [];

    dataArr.forEach(function(line) {
        let video = {
            "id": "",
            "title": "",
            "start": 123
        }

        var splitLine = line.split(": ")
        var remainder = splitLine[1].split("t=")
        video.title = splitLine[0]
        video.start =  remainder[1] || "0"
        
        if (remainder[0].includes("v=")) {
            video.id = remainder[0].split("v=")[1]
        } else {
            video.id = remainder[0].split(".be/")[1]
        }

        videos.push(video)

    });

    return videos;
}

asyncReadFile('./data.txt');