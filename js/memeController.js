'use strict'

let gElCanvas
let gCtx

let gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] }]
let gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I sometimes eat Falafel',
      size: 20,
      color: 'red',
    },
  ],
}
let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  console.log(gCtx)
}

function onSelectImg(elImg) {
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {}
