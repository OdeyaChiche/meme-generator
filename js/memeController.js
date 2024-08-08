'use strict'

let gElCanvas
let gCtx
let gStartY = 50

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  renderGallery(gImgs)
}

function renderGallery(imgs) {
  const elGallery = document.querySelector('.img-container')
  let count = 1
  let strHtml = ''

  for (let i = 0; i < imgs.length; i++) {
    strHtml += `<img src='${imgs[i].url}' class="${count}" onclick="onImgSelect(${imgs[i].id})" />`
    count++
  }

  elGallery.innerHTML = strHtml
}

function renderMeme() {
  const elCanvasContainer = document.querySelector('.editor-container')
  elCanvasContainer.classList.remove('hidden')

  const { selectedImgId, lines } = getMeme()
  console.log(selectedImgId)

  let selectedImg = gImgs.find((img) => img.id === selectedImgId)

  const elImg = new Image()
  elImg.src = selectedImg.url

  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

  renderTextLines()
  drawFrame()
}

function renderTextLines() {
  for (let i = 0; i < gMeme.lines.length; i++) {
    let txt = gMeme.lines[i].txt
    drawText(txt, i)
  }
}

function showGallery() {
  let elGallery = document.querySelector('.gallery')
  let elKeywordSearch = document.querySelector('.search-keyword')

  elGallery.classList.remove('hidden')
  elKeywordSearch.classList.remove('hidden')

  const elCanvasContainer = document.querySelector('.editor-container')
  elCanvasContainer.classList.add('hidden')

  onInit()

  let elWordSearch = document.querySelector('.keywords')
  elWordSearch.value = ''
}

function onImgSelect(imgId) {
  setImg(imgId)
}

function onSetLine(txt) {
  setLineTxt(txt)
}

function downloadMeme(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  elLink.href = dataUrl

  elLink.download = 'my-meme'
}

function onChangeColor(value) {
  changeTextColor(value)
}

function increaseFont() {
  gMeme.lines[gMeme.selectedLineIdx].size += 5

  renderMeme()
}

function decreaseFont() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 5

  renderMeme()
}

function addLine() {
  clearFrame()

  gMeme.lines.push({
    txt: 'Add Text Here',
    size: 30,
    font: gMeme.lines[gMeme.selectedLineIdx].font,
    color: 'white',
    startY: gStartY + 50,
    startX: 20,
  })

  gMeme.selectedLineIdx = gMeme.lines.length - 1
  renderMeme()
  renderTextLines()

  gStartY += 50

  const elText = document.querySelector('.line-text')
  elText.value = ''
}

function switchLine() {
  if (gMeme.selectedLineIdx === gMeme.lines.length - 1)
    gMeme.selectedLineIdx = 0
  else gMeme.selectedLineIdx++

  renderMeme()
  renderTextLines()

  const elText = document.querySelector('.line-text')

  if (gMeme.lines[gMeme.selectedLineIdx].txt === 'Add Text Here')
    elText.value = ''
  else elText.value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function onMouseClick(ev) {
  const { offsetX, offsetY } = ev

  const clickedLineIdx = gMeme.lines.findIndex((line) => {
    let txtMeasure = gCtx.measureText(line.txt)
    let lineWidth = txtMeasure.width

    return (
      offsetX >= line.startX &&
      offsetX <= line.startX + lineWidth &&
      offsetY <= line.startY &&
      offsetY >= line.startY - line.size
    )
  })

  if (clickedLineIdx === -1) return

  clearFrame()

  gMeme.selectedLineIdx = clickedLineIdx
  renderMeme()

  moveWithKeys()

  console.log(clickedLineIdx)
}

function onChangeFont(value) {
  changeFont(value)
}

function alignText(direction) {
  gDirection = direction
  let txtMeasure
  let txtWidth

  switch (direction) {
    case 'left':
      gMeme.lines[gMeme.selectedLineIdx].startX = 20
      break
    case 'center':
      txtMeasure = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
      txtWidth = txtMeasure.width
      gMeme.lines[gMeme.selectedLineIdx].startX = 400 / 2 - txtWidth / 2
      break
    case 'right':
      txtMeasure = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt)
      txtWidth = txtMeasure.width
      gMeme.lines[gMeme.selectedLineIdx].startX = 400 - txtWidth - 20
      break
  }
  renderMeme()
}

function onDeleteLine() {
  if (gMeme.lines.length === 1) {
    gStartY = 50
    return
  }

  let selectedIdx = gMeme.selectedLineIdx
  let length = gMeme.lines.length - 1

  gMeme.lines.splice(gMeme.selectedLineIdx, 1)

  if (selectedIdx === length) gMeme.selectedLineIdx--
  renderMeme()
}

function moveLine(dx, dy) {
  gMeme.lines[gMeme.selectedLineIdx].startX += dx
  gMeme.lines[gMeme.selectedLineIdx].startY += dy

  renderMeme()
}

function moveWithKeys() {
  window.addEventListener('keydown', function (event) {
    switch (event.key) {
      case 'ArrowUp':
        moveLine(0, -5)
        break
      case 'ArrowDown':
        moveLine(0, 5)
        break
      case 'ArrowLeft':
        moveLine(-5, 0)
        break
      case 'ArrowRight':
        moveLine(5, 0)
        break
    }
  })
}

function moveWithMouse(dx, dy) {
  moveLine(dx, dy)
}

function selectRandomMeme() {
  let randomId = getRandomIntInclusive(0, gImgs.length - 1)

  console.log(randomId)
  onImgSelect(randomId)
}

function filterGallery(value) {
  let filteredGallery = gImgs.filter((img) =>
    img.keywords.find((word) => word === value)
  )

  renderGallery(filteredGallery)
}

function clearFilter() {
  renderGallery(gImgs)
}

// function onSaveMeme() {
//   const dataURL = gCtx.toDataURL('image/png')
//   localStorage.setItem('savedMeme', dataURL)

//   alert('saved')
// }
