'use strict'

let gElCanvas
let gCtx
let gStartY = 50

function onInit() {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  renderGallery()
}

function renderMeme() {
  const elCanvasContainer = document.querySelector('.editor-container')
  elCanvasContainer.classList.remove('hidden')

  const { selectedImgId, lines } = getMeme()

  let selectedImg = gImgs.find((img) => img.id === selectedImgId)

  const elImg = new Image()
  elImg.src = selectedImg.url

  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

  renderTextLines()
  drawFrame()
}

function renderGallery() {
  const elGallery = document.querySelector('.img-container')
  let count = 1
  let strHtml = ''

  for (let i = 0; i < gImgs.length; i++) {
    strHtml += `<img src='${gImgs[i].url}' class="${count}" onclick="onImgSelect(${count})" />`
    count++
  }

  //   let galleryHtml = gImgs.map((img) => {
  //     return `<img src=${img.url} class="${count}" onclick="onSelectImg(${count})" />`
  //     count++
  //     console.log(count);
  //   })

  elGallery.innerHTML = strHtml
}

function renderTextLines() {
  for (let i = 0; i < gMeme.lines.length; i++) {
    let txt = gMeme.lines[i].txt
    drawText(txt, i)
  }

  //   drawFrame(txt, startX, startY)
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
    color: 'black',
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
