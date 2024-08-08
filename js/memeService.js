'use strict'

let gImgs = [
  {
    id: 1,
    url: 'img/meme-imgs (square)/1.jpg',
    keywords: ['funny', 'determined', 'president', 'man'],
  },
  {
    id: 2,
    url: 'img/meme-imgs (square)/2.jpg',
    keywords: ['cute', 'dog', 'sleep'],
  },
  {
    id: 3,
    url: 'img/meme-imgs (square)/3.jpg',
    keywords: ['cute', 'dog', 'sleep'],
  },
  {
    id: 4,
    url: 'img/meme-imgs (square)/4.jpg',
    keywords: ['cute', 'cat', 'sleep'],
  },
  {
    id: 5,
    url: 'img/meme-imgs (square)/5.jpg',
    keywords: ['cute', 'baby', 'determined'],
  },
  { id: 6, url: 'img/meme-imgs (square)/6.jpg', keywords: ['man', 'funny'] },
  {
    id: 7,
    url: 'img/meme-imgs (square)/7.jpg',
    keywords: ['cute', 'baby', 'funny', 'shock'],
  },
  { id: 8, url: 'img/meme-imgs (square)/8.jpg', keywords: ['funny', 'man'] },
  {
    id: 9,
    url: 'img/meme-imgs (square)/9.jpg',
    keywords: ['cute', 'baby', 'mischievous'],
  },
  {
    id: 10,
    url: 'img/meme-imgs (square)/10.jpg',
    keywords: ['funny', 'president', 'man'],
  },
  { id: 11, url: 'img/meme-imgs (square)/11.jpg', keywords: ['strong', 'man'] },
  { id: 12, url: 'img/meme-imgs (square)/12.jpg', keywords: ['smart', 'man'] },
  {
    id: 13,
    url: 'img/meme-imgs (square)/13.jpg',
    keywords: ['nice', 'drink', 'man'],
  },
  {
    id: 14,
    url: 'img/meme-imgs (square)/14.jpg',
    keywords: ['serious', 'smart', 'man'],
  },
  {
    id: 15,
    url: 'img/meme-imgs (square)/15.jpg',
    keywords: ['funny', 'mischievous', 'man'],
  },
  { id: 16, url: 'img/meme-imgs (square)/16.jpg', keywords: ['funny', 'man'] },
]
let gMeme = {
  selectedImgId: 2,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Add Text Here',
      size: 30,
      font: 'Arial',
      color: 'white',
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

  gCtx.setLineDash([]);
  let size = gMeme.lines[i].size
  let y = gMeme.lines[i].startY
  let x = gMeme.lines[i].startX

  gCtx.lineWidth = 1
  gCtx.fillStyle = gMeme.lines[i].color
  gCtx.font = `bold ${size}px ${gMeme.lines[i].font}`

  gCtx.fillText(text, x, y)
  gCtx.strokeText(text, x, y)
}

function changeTextColor(value) {
  gMeme.lines[gMeme.selectedLineIdx].color = value

  renderMeme()
}

function calculateSize() {
  let txtMeasure = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)

  let variables = {
    x: gMeme.lines[gMeme.selectedLineIdx].startX,
    y: gMeme.lines[gMeme.selectedLineIdx].startY,

    txtMeasure: gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt),
    txtWidth: txtMeasure.width,
    txtHeight: gMeme.lines[gMeme.selectedLineIdx].size,
  }

  return variables
}

function drawFrame() {
  let { x, y, txtWidth, txtHeight } = calculateSize()

  gCtx.setLineDash([5, 2]); 

  gCtx.strokeStyle = 'black'
  gCtx.lineWidth = 2
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
