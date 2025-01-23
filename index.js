import{a as F,S as b,i}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const w="https://pixabay.com/api/",C="48245420-0c25989f875d1fe30dc45addb";async function p(t,r=1,a=15){try{return(await F.get(w,{params:{key:C,q:t.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:a}})).data}catch(s){throw console.error("Error fetching photos:",s.message),s}}function f(t){return t.map(({webformatURL:r,largeImageURL:a,tags:s="No tags",likes:e=0,views:o=0,comments:l=0,downloads:h=0})=>`<li class="gallery-item">
            <a class="gallery-link" href="${a}">
                <img class="gallery-image" src="${r}" alt="${s}" loading="lazy" />
            </a>
            <ul class="inform">
                <li class="inform-item">
                    <h2 class="inform-title">Likes:</h2>
                    <p class="inform-dan">${e}</p>
                </li>
                <li class="inform-item">
                    <h2 class="inform-title">Views:</h2>
                    <p class="inform-dan">${o}</p>
                </li>
                <li class="inform-item">
                    <h2 class="inform-title">Comments:</h2>
                    <p class="inform-dan">${l}</p>
                </li>
                <li class="inform-item">
                    <h2 class="inform-title">Downloads:</h2>
                    <p class="inform-dan">${h}</p>
                </li>
            </ul>
        </li>`).join("")}const E=document.querySelector(".form-search"),g=document.querySelector(".gallery"),c=document.querySelector(".loader"),n=document.querySelector(".load-more");c.style.display="none";n.style.display="none";let m="",d=1;const y=15,u=new b(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),L=async t=>{if(t.preventDefault(),m=t.target.elements.user_query.value.trim(),d=1,g.innerHTML="",n.style.display="none",!m){i.show({backgroundColor:"#EF4040",message:"Enter the data for the search!",messageColor:"#FFFFFF",position:"topRight"});return}c.style.display="inline-block";try{const r=await p(m,d,y);if(r.hits.length===0){i.show({backgroundColor:"#EF4040",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",position:"topCenter"});return}g.insertAdjacentHTML("beforeend",f(r.hits)),u.refresh(),r.hits.length>=y&&(n.style.display="block")}catch(r){console.error(r.message),i.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topCenter",backgroundColor:"#EF4040",messageColor:"#FFFFFF"})}finally{c.style.display="none",t.target.reset()}},S=async()=>{d+=1,c.style.display="inline-block",n.style.display="none";try{const t=await p(m,d,y);if(t.hits.length===0){i.show({backgroundColor:"#EF4040",message:"No more images to load.",messageColor:"#FFFFFF",position:"topCenter"});return}g.insertAdjacentHTML("beforeend",f(t.hits)),u.refresh();const r=document.querySelector(".gallery .gallery-item");if(r){const{height:a}=r.getBoundingClientRect();window.scrollBy({top:a*2,behavior:"smooth"})}t.hits.length>=y&&(n.style.display="block")}catch(t){console.error(t.message),i.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topCenter",backgroundColor:"#EF4040",messageColor:"#FFFFFF"})}finally{c.style.display="none"}};E.addEventListener("submit",L);n.addEventListener("click",S);
//# sourceMappingURL=index.js.map
