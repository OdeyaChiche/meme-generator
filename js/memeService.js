'use strict'

let gImgs = [
  { id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['funny'] },
  { id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords: ['cute', 'dog'] },
  { id: 3, url: 'img/meme-imgs (square)/3.jpg', keywords: ['cute', 'dog'] },
  { id: 4, url: 'img/meme-imgs (square)/4.jpg', keywords: ['cute', 'dog'] },
  { id: 5, url: 'img/meme-imgs (square)/5.jpg', keywords: ['cute', 'dog'] },
  { id: 6, url: 'img/meme-imgs (square)/6.jpg', keywords: ['cute', 'dog'] },
  { id: 7, url: 'img/meme-imgs (square)/7.jpg', keywords: ['cute', 'dog'] },
  { id: 8, url: 'img/meme-imgs (square)/8.jpg', keywords: ['cute', 'dog'] },
  { id: 9, url: 'img/meme-imgs (square)/9.jpg', keywords: ['cute', 'dog'] },
  { id: 10, url: 'img/meme-imgs (square)/10.jpg', keywords: ['cute', 'dog'] },
  { id: 11, url: 'img/meme-imgs (square)/11.jpg', keywords: ['cute', 'dog'] },
  { id: 12, url: 'img/meme-imgs (square)/12.jpg', keywords: ['cute', 'dog'] },
  { id: 13, url: 'img/meme-imgs (square)/13.jpg', keywords: ['cute', 'dog'] },
  { id: 14, url: 'img/meme-imgs (square)/14.jpg', keywords: ['cute', 'dog'] },
  { id: 15, url: 'img/meme-imgs (square)/15.jpg', keywords: ['cute', 'dog'] },
  { id: 16, url: 'img/meme-imgs (square)/16.jpg', keywords: ['cute', 'dog'] },
  { id: 17, url: 'img/meme-imgs (square)/17.jpg', keywords: ['cute', 'dog'] },
  { id: 18, url: 'img/meme-imgs (square)/18.jpg', keywords: ['cute', 'dog'] },
]
let gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Add Text Here',
      size: 30,
      font: 'Arial',
      color: 'black',
      startY: 50,
      startX: 20,
    },
  ],
}
let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
let gDirection = 'left'
function getMeme() {
  return gMeme
}

function setImg(imgId) {
  let elGallery = document.querySelector('.gallery')
  let elKeywordSearch = document.querySelector('.search-keyword')
  gMeme.selectedImgId = imgId

  renderMeme()
  elGallery.classList.add('hidden')
  elKeywordSearch.classList.add('hidden')

  console.log(elKeywordSearch)
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt

  renderMeme()
}

function drawText(text, i) {
  let size = gMeme.lines[i].size
  let y = gMeme.lines[i].startY
  let x = gMeme.lines[i].startX

  gCtx.lineWidth = 1
  gCtx.fillStyle = gMeme.lines[i].color
  gCtx.font = `${size}px ${gMeme.lines[i].font}`

  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function changeTextColor(value) {
  gMeme.lines[gMeme.selectedLineIdx].color = value

  renderMeme()
}

function drawFrame() {
  let x = gMeme.lines[gMeme.selectedLineIdx].startX
  let y = gMeme.lines[gMeme.selectedLineIdx].startY

  let txtMeasure = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
  let txtWidth = txtMeasure.width
  let txtHeight = gMeme.lines[gMeme.selectedLineIdx].size

  gCtx.strokeStyle = 'black'
  gCtx.lineWidth = 4
  gCtx.strokeRect(x - 5, y - txtHeight, txtWidth + 10, txtHeight + 10)
}

function clearFrame() {
  let x = gMeme.lines[gMeme.selectedLineIdx].startX
  let y = gMeme.lines[gMeme.selectedLineIdx].startY

  let txtMeasure = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
  let txtWidth = txtMeasure.width
  let txtHeight = gMeme.lines[gMeme.selectedLineIdx].size

  gCtx.clearRect(x - 5, y - txtHeight, txtWidth + 10, txtHeight + 10)
}

function changeFont(value) {
  gMeme.lines[gMeme.selectedLineIdx].font = value

  clearFrame()
  renderMeme()
  console.log(value)
}
