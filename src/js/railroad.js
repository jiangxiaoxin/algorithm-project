/**
 * 火车车厢编排问题（用栈实现）
 * 
 * 用几个例子测试，都正确输出了，应该没问题吧
 */

 console.log("火车车厢编排问题")


//  let inputOrder = [3,6,9,2,4,7,1,8,5];
// let numberOfTracks = 3

// let inputOrder = [4,2,3,6,7,1,5,8,9]
// let numberOfTracks = 3


// let inputOrder = [3,4,5,2,1]
// let inputOrder = [4,2,3,5,1,6]
let inputOrder = [4,2,3,5,6,1]
let numberOfTracks = 3

// let inputOrder = [4,11,7,13,9,10,1,8,2,12,15,3,14,5,6]
// let numberOfTracks = 8


 let numberOfCars = inputOrder.length;

 let nextToOutput = 1;

 let tracks = [];
 for(let i=0;i<numberOfTracks;i++) {
   tracks[i] = [];
 }

 let smallestCarInTrack = Number.MAX_SAFE_INTEGER
 let smallestCarTrackIndex = -1

function railroad() {
  for(let i=0;i<numberOfCars;i++) {
    if (inputOrder[i] == nextToOutput) {
      // 输入的正好就是想要编排的，那就可以直接放到输出端了
      console.log(`==>直接输出车厢: 在输入里的index:${i}，编号key:<${inputOrder[i]}>`);
      nextToOutput++;
 
      // 下一个编排的号出来了，那就看看缓冲组里有没有，有就输出，没有就输入下一个，进行判断
      while(nextToOutput == smallestCarInTrack) {
        outputFromTrack();
        nextToOutput++;
      }
    } else {
      // 输入进来的不是想要编排的，就先放到缓冲组里
      let result = putIntoTrack(i, inputOrder[i]);
      if (result >= 0) {
        console.log(`原index:${i} <key:${inputOrder[i]}>的车厢，希望放到[${result}]缓冲道上`)
        tracks[result].push(inputOrder[i]);
        // 把这个新车厢放入缓冲道上之后，有可能更新smallestCarInTrack
        if (inputOrder[i] < smallestCarInTrack) {
          smallestCarInTrack = inputOrder[i];
          smallestCarTrackIndex = result;
          console.log(`车厢放入缓冲道之后，更新了最小车和最小车道，smallestCarInTrack:<${smallestCarInTrack}> smallestCarTrackIndex:<${smallestCarTrackIndex}>`)
        }

      } else {
        console.log(`原index:${i} key:<${inputOrder[i]}>的车厢[<找不到>]缓冲道放，所以不能实现功能，退出`)
        return false;
      }
    }
  }
  return true;
}

console.log(railroad())

function outputFromTrack() {
  console.log(`==>缓冲道上有合适的车可以出去 car:<${smallestCarInTrack}>  所在道index:<${smallestCarTrackIndex}>`);
  // 输出了之后，要把所在的道去掉它
  tracks[smallestCarTrackIndex].pop();
  // 更新smallestCarInTrack和smallestCarTrackIndex
  let _small = Number.MAX_SAFE_INTEGER
  let _smallIndex = -1
  for(let i=0;i<numberOfTracks;i++) {
    let track = tracks[i];
    let top = track.length ? track[track.length-1] : null
    if (top == null) {
      // 这道已经没有了，不管
    } else {
      if (top < _small) {
        _small = top
        _smallIndex = i
      }
    }
  }
  smallestCarInTrack = _small;
  smallestCarTrackIndex = _smallIndex;
  if (_smallIndex != -1) {
    console.log(`从缓冲道里弹出一个后，更新smallest, key是${smallestCarInTrack} 所在道index:${smallestCarTrackIndex}`)
  } else {
    console.log(`从缓冲道里弹出一个后，更新smallest, 但已经找不到好更新的了，都走光了`)
  }
}

// 寻找合适的地方放车厢
function putIntoTrack(index, key) {
  let bestTrackIndex = -1;
  let smallestDistance = Number.MAX_SAFE_INTEGER;
  for(let i=0;i<numberOfTracks;i++) {
    let track = tracks[i];
    let top = track.length > 0 ? track[track.length-1] : null;// 如果track里有缓冲的车厢，那就拿出栈顶的
    if (top != null) {
      // 当前考察的栈有缓冲的车厢
      if (key < top) {
        // 新放入的车厢key必须要小于之前放入的，这样才能保证出去的时候，按照从小到大的顺序
        let distance = top - key;
        if (distance < smallestDistance) {
          smallestDistance = distance
          bestTrackIndex = i;
        }
      }
    } else {
      // 当前考察的栈没有缓冲车厢，可以考虑放入
      let distance = key;
      if (distance < smallestDistance) {
        smallestDistance = distance;
        bestTrackIndex = i;
      }
    }
  }
  return bestTrackIndex;
}