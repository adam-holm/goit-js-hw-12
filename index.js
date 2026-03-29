import{a as d,S as p,i as l}from"./assets/vendor-D8kWkXeg.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const g="55203157-9703e432d06ec35062b99b950",h="https://pixabay.com/api/";function y(i){return d.get(h,{params:{key:g,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>r.data)}const u=document.querySelector(".gallery"),a=document.querySelector(".loader");let b=new p(".gallery a",{captionsData:"alt",captionDelay:250});function L(i){const r=i.map(({webformatURL:o,largeImageURL:n,tags:e,likes:t,views:s,comments:f,downloads:m})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${n}">
          <img class="gallery-image" src="${o}" alt="${e}" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b>${t}</p>
          <p class="info-item"><b>Views</b>${s}</p>
          <p class="info-item"><b>Comments</b>${f}</p>
          <p class="info-item"><b>Downloads</b>${m}</p>
        </div>
      </li>`).join("");u.innerHTML=r,b.refresh()}function S(){u.innerHTML=""}function w(){a&&a.classList.remove("is-hidden")}function q(){a&&a.classList.add("is-hidden")}const c=document.querySelector(".form");c.addEventListener("submit",i=>{i.preventDefault();const r=i.target.elements["search-text"].value.trim();if(!r){l.warning({message:"Please enter a search term"});return}S(),w(),y(r).then(o=>{if(o.hits.length===0){l.error({message:"Sorry, there are no images matching your search query.",position:"topRight"});return}L(o.hits)}).catch(o=>{console.error(o),l.error({message:"Something went wrong!"})}).finally(()=>{q(),c.reset()})});
//# sourceMappingURL=index.js.map
