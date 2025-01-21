import{a as f,S as u,i as n}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const d="https://pixabay.com/api/",p="48245420-0c25989f875d1fe30dc45addb";function h(o){const r=new URLSearchParams({key:p,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});return f.get(`${d}?${r}`)}function y(o){return o.map(({webformatURL:r,largeImageURL:s,tags:a,likes:e,views:t,comments:i,downloads:m})=>`<li class="gallery-item">
            <a class="gallery-link" href="${s}">
                <img class="gallery-image" src="${r}" alt="${a}"/>
            </a>
                <ul class="inform">
                    <li class="inform-item">
                        <h2 class="inform-title">Likes:</h2>
                        <p class="inform-dan">${e}</p>
                    </li>
                    <li class="inform-item">
                        <h2 class="inform-title">Views:</h2>
                        <p class="inform-dan">${t}</p>
                    </li>
                    <li class="inform-item">
                        <h2 class="inform-title">Comments:</h2>
                        <p class="inform-dan">${i}</p>
                    </li>
                    <li class="inform-item">
                        <h2 class="inform-title">Downloads:</h2>
                        <p class="inform-dan">${m}</p>
                    </li>
                </ul>
            
    </li>`).join("")}const g=document.querySelector(".form-search"),c=document.querySelector(".gallery"),l=document.querySelector(".loader");l.style.display="none";const F=new u(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),b=o=>{o.preventDefault();let r=o.target.elements.user_query.value.trim();if(c.innerHTML=" ",!r){n.show({backgroundColor:"#EF4040",message:"Enter the data for the search!",messageColor:"#FFFFFF",position:"topRight"});return}l.style.display="inline-block",h(r).then(s=>{s.hits.length===0&&n.show({title:"",backgroundColor:"#EF4040",messageColor:"#FFFFFF",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter"}),c.insertAdjacentHTML("beforeend",y(s.hits)),F.refresh(),l.style.display="none"}).catch(s=>{console.log(s.message),n.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topCenter",backgroundColor:"#EF4040",messageColor:"#FFFFFF"})}).finally(()=>{o.target.reset(),l.style.display="none"})};g.addEventListener("submit",b);
//# sourceMappingURL=index.js.map
