import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



const API_KEY = '42373349-27b23dee84583d41aca0b8d31';

const inputQueryRef = document.querySelector('input')
const submitButtonRef = document.querySelector('button')
const hitsContainer = document.querySelector('.gallery')
const loaderRef = document.querySelector('.loader')
const formRef = document.querySelector('form')

formRef.addEventListener('submit', onInputQuery)

onHideLoaderText()
function onShowLoaderText() {
    loaderRef.style.display = 'block';
    
}

function onHideLoaderText() {
    loaderRef.style.display = 'none';
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  enableKeyboard: true,
});


function onInputQuery(evt) {
  evt.preventDefault()
const query = inputQueryRef.value.trim()
  if (query === '') {
    hitsContainer.innerHTML = "";
    iziToast.show({
      title: 'Error',
      message: 'Please, enter a non-blank line',
      titleSize: '16px',
      titleLineHeight: '150%',
      messageSize: '16px',
      messageLineHeight: '150%',
      backgroundColor: '#ef4040',
      position: 'bottomRight',
    })
    return
  } else {
    
    getPicture(query)
  }
  inputQueryRef.value = ""
}

console.log(inputQueryRef)
console.log(submitButtonRef)

function getPicture(query) {
  onShowLoaderText()
  const urlAPI = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  fetch(urlAPI).then(res => {
    if (!res.ok) {
    throw new Error(res.status)
    }
    return res.json()
  }).then(({ hits, totalHits
 }) => {
    if (totalHits !== 0) {
      render(hits) 
      onHideLoaderText()
    } else {
      hitsContainer.innerHTML = ""
iziToast.show({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query. Please try again!',
      titleSize: '16px',
      titleLineHeight: '150%',
      messageSize: '16px',
      messageLineHeight: '150%',
      backgroundColor: '#ef4040',
      position: 'bottomRight',
    })
    }
  }).catch(error => 
    console.error(error)).finally()  
  
}

function render(hits) {
  hitsContainer.innerHTML = '';
 const hitsRef = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="gallery">
            <ul>
        <li><a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"/></a></li>
          <li><p>Likes ${likes}</p></li>
          <li>
            <p>Views ${views}</p>
          </li>
          <li><p>Comments ${comments}</p></li>
          <li><p>Downloads ${downloads}</p></li>
        </ul>
        </div>`
    })
  hitsContainer.insertAdjacentHTML('beforeend', hitsRef.join(''))
  lightbox.refresh()
}

