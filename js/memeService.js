'use strict'

let gImgs = [
  { id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['funny'] },
  { id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords: ['cute', 'dog'] },
]
let gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Add Text Here',
      size: 30,
      color: 'black',
      startY: 50,
      startX: 20,
    },
  ],
}
let gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
  return gMeme
}

function setImg(imgId) {
  let elGallery = document.querySelector('.gallery')
  gMeme.selectedImgId = imgId

  renderMeme()
  elGallery.classList.add('hidden')
}

function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt

  renderMeme()
}

function drawText(text, x, i) {
  let size = gMeme.lines[i].size
  let y = gMeme.lines[i].startY

  gCtx.lineWidth = 1
  gCtx.fillStyle = gMeme.lines[i].color
  gCtx.font = `${size}px Arial`

  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function changeTextColor(value) {
  gMeme.lines[gMeme.selectedLineIdx].color = value

  console.log(gMeme.lines)

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
  gCtx.strokeRect(x - 5, y - txtHeight , txtWidth + 10, txtHeight + 10)
}

function clearFrame(){
    let x = gMeme.lines[gMeme.selectedLineIdx].startX
    let y = gMeme.lines[gMeme.selectedLineIdx].startY
  
    let txtMeasure = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
    let txtWidth = txtMeasure.width
    let txtHeight = gMeme.lines[gMeme.selectedLineIdx].size
    
    gCtx.clearRect(x - 5, y - txtHeight , txtWidth + 10, txtHeight + 10)
}
