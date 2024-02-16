import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { hitsContainer, render } from "./render-functions";

const API_KEY = '42373349-27b23dee84583d41aca0b8d31';

const inputQueryRef = document.querySelector('input');
const submitButtonRef = document.querySelector('button');
const loaderRef = document.querySelector('.loader');
const formRef = document.querySelector('form');

formRef.addEventListener('submit', onInputQuery);

onHideLoaderText();
function onShowLoaderText() {
    loaderRef.style.display = 'block';
    
}

function onHideLoaderText() {
    loaderRef.style.display = 'none';
}

function onInputQuery(evt) {
  evt.preventDefault();
  const query = inputQueryRef.value.trim();
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
    });
    return
  } else {
    
    getPicture(query);
  }
  inputQueryRef.value = "";
}

console.log(inputQueryRef)
console.log(submitButtonRef)

function getPicture(query) {
  onShowLoaderText();
  const urlAPI = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  fetch(urlAPI).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  }).then(({ hits, totalHits
  }) => {
    if (totalHits !== 0) {
      render(hits);
      onHideLoaderText();
    } else {
      onHideLoaderText();
      hitsContainer.innerHTML = "";
      iziToast.show({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        titleSize: '16px',
        titleLineHeight: '150%',
        messageSize: '16px',
        messageLineHeight: '150%',
        backgroundColor: '#ef4040',
        position: 'bottomRight',
      });
    };
  }).catch(error =>
    console.error(error)).finally();  
};



