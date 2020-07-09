/**
 * 火车编排问题（用队列实现）
 */
console.log("== 火车编排问题（用队列实现）==")

let inputOrder = [3,6,9,2,4,7,1,8,5];
let numberOfTracks = 3;
let numberOfCars = inputOrder.length;

let tracks = [] //缓冲道数组，这次是用队列来实现
for(let i=0;i<numberOfTracks;i++) {
  tracks[i] = [];
}

let smallestCarInTrack = Number.MAX_SAFE_INTEGER;
let smallestCarTrackIndex = -1;

function railroad() {
  let nextToOutput = 1; // 希望输出的车厢key
  for(let i=0;i<numberOfCars;i++) {
    if (inputOrder[i] == nextToOutput) {
      // 正好是希望输出的
      console.log(`===> 输出车厢[${nextToOutput}]`);
      nextToOutput++;
      while(smallestCarInTrack == nextToOutput) {
        outputFromTrack();
        nextToOutput++;
      }
    } else {
      // 不是希望输出的，那就找个缓冲道放着
      let result = putIntoTrack(inputOrder[i]);
      if (result > -1) {
        // 找到可放的缓冲道
        console.log(`找到缓冲道放车厢，缓冲道${result} 车厢${inputOrder[i]}`)
        tracks[result].push(inputOrder[i]); //把车放到缓冲道里
        if(smallestCarInTrack > inputOrder[i]) {
          smallestCarInTrack = inputOrder[i]
          smallestCarTrackIndex = result;
        }
      } else {
        console.log(`*** 车厢${inputOrder[i]}找不到缓冲道，失败`)
        return false;
      }
    }
  }
  // 都放完了，没报错，那就能按要求编好
  console.log("@@ 成功")
  return true;
}

console.log(railroad())

// 给车找个合适的缓冲道放进去
function putIntoTrack(carKey) {
  let smallestDistance = Number.MAX_SAFE_INTEGER
  let bestIndex = -1
  for(let i=0;i<numberOfTracks;i++) {
    let track = tracks[i];
    if (track.length == 0) {
      // 这条道里还没有放车
      let distance = carKey
      if (distance < smallestDistance) {
        smallestDistance = distance
        bestIndex = i;
      }
    } else {
      // 缓冲道里有车
      let last = track[track.length-1];
      if (last < carKey) {
        // 缓冲道是队列设计，前面的车要比carKey小才能保证，从队列头输出时从小到大有序
        let distance = carKey - last
        if (distance < smallestDistance) {
          smallestDistance = distance
          bestIndex = i;
        }
      }
    }
  }
  return bestIndex;
}

function outputFromTrack() {
  console.log(`===> 输出车厢[${smallestCarInTrack}],在缓冲道${smallestCarTrackIndex}`)
  let track = tracks[smallestCarTrackIndex];
  track.shift();
  let _small = Number.MAX_SAFE_INTEGER;
  let _smallIndex = -1;
  for(let i=0;i<numberOfTracks;i++) {
    let track = tracks[i];
    if (track.length == 0) {
      // 这条track里已经没有车了
    } else {
      let car = track[0];
      if (car < _small) {
        _small = car;
        _smallIndex = i;
      }
    }
  }
  smallestCarInTrack = _small;
  smallestCarTrackIndex = _smallIndex;
  console.log(`从缓冲道里走出一辆车后，更新smallest`)
  if (smallestCarTrackIndex == -1) {
    console.log(`此时缓冲道里没有车了，都走光了`)
  } else {
    console.log(`缓冲道里下一辆车是${smallestCarInTrack}`)
  }
}