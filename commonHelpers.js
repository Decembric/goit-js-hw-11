import{S as m,i as u}from"./assets/vendor-5b791d57.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const y=new m(".gallery a",{captionDelay:250,captionsData:"alt",enableKeyboard:!0}),l=document.querySelector(".gallery");function g(i){l.innerHTML="";const r=i.map(({webformatURL:o,largeImageURL:n,tags:e,likes:t,views:s,comments:d,downloads:p})=>`<div class="gallery">
            <ul>
        <li><a href="${n}"><img src="${o}" alt="${e}"/></a></li>
          <li><p>Likes ${t}</p></li>
          <li>
            <p>Views ${s}</p>
          </li>
          <li><p>Comments ${d}</p></li>
          <li><p>Downloads ${p}</p></li>
        </ul>
        </div>`);l.insertAdjacentHTML("beforeend",r.join("")),y.refresh()}const h="42373349-27b23dee84583d41aca0b8d31",a=document.querySelector("input"),b=document.querySelector("button"),f=document.querySelector(".loader"),L=document.querySelector("form");L.addEventListener("submit",q);c();function S(){f.style.display="block"}function c(){f.style.display="none"}function q(i){i.preventDefault();const r=a.value.trim();if(r===""){l.innerHTML="",u.show({title:"Error",message:"Please, enter a non-blank line",titleSize:"16px",titleLineHeight:"150%",messageSize:"16px",messageLineHeight:"150%",backgroundColor:"#ef4040",position:"bottomRight"});return}else w(r);a.value=""}console.log(a);console.log(b);function w(i){S();const r=`https://pixabay.com/api/?key=${h}&q=${i}&image_type=photo&orientation=horizontal&safesearch=true`;fetch(r).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()}).then(({hits:o,totalHits:n})=>{n!==0?(g(o),c()):(c(),l.innerHTML="",u.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",titleSize:"16px",titleLineHeight:"150%",messageSize:"16px",messageLineHeight:"150%",backgroundColor:"#ef4040",position:"bottomRight"}))}).catch(o=>console.error(o)).finally()}
//# sourceMappingURL=commonHelpers.js.map