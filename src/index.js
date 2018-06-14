const imagesURL = 'http://localhost:3000/api/v1/images'
const likesURL = 'http://localhost:3000/api/v1/likes'
const container = document.getElementById('container')
const imageField = document.getElementById('post-image-form-url')

function fetchImages() {
  fetch(imagesURL).then(resp => resp.json()).then(data => appendImages(data))
}

function appendImages(imageObjs) {
  container.innerHTML = ''
  imageObjs.forEach(function(img) {
    container.innerHTML += `<div class="image-container">
       <img src="${img.url}">
       <p>
        <img data-action="like-image" data-image-id="${img.id}" class="like-button" src="./images/like.png"><br>
        <span id="likes-count-for-image-${img.id}">${img.likes_count}</span>
       </p>
    </div>`
  })
}

document.addEventListener('click', function(event){
  if (event.target.className === 'like-button') {
    addALike(event.target.dataset.imageId)
  } else if (event.target.tagName === 'BUTTON' && event.target.type === 'submit') {
    event.preventDefault()
    addAnImage(imageField.value)
    imageField.value = ''
  }
})

function addALike(imageId) {
  let config = {
    method: 'POST',
    headers: {'Content-type':'application/json', 'Data-type':'application/json'},
    body: JSON.stringify({image_id: imageId})
  }
  fetch(likesURL, config).then(fetchImages)
}

function addAnImage(imageURL) {
  let config2 = {
    method: 'POST',
    headers: {'Content-type':'application/json', 'Data-type':'application/json'},
    body: JSON.stringify({url: imageURL})
  }
  fetch(imagesURL, config2).then(fetchImages)
}

fetchImages()
