import{a as F,S as b,i as l}from"./assets/vendor-DEenWwFD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const w="https://pixabay.com/api/",C="48245420-0c25989f875d1fe30dc45addb";async function f(r,t=1,n=15){try{return(await F.get(w,{params:{key:C,q:r.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:n}})).data}catch(s){throw console.error("Error fetching photos:",s.message),s}}function g(r){return r.map(({webformatURL:t,largeImageURL:n,tags:s="No tags",likes:e=0,views:o=0,comments:i=0,downloads:h=0})=>`<li class="gallery-item">
            <a class="gallery-link" href="${n}">
                <img class="gallery-image" src="${t}" alt="${s}" loading="lazy" />
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
                    <p class="inform-dan">${i}</p>
                </li>
                <li class="inform-item">
                    <h2 class="inform-title">Downloads:</h2>
                    <p class="inform-dan">${h}</p>
                </li>
            </ul>
        </li>`).join("")}const E=document.querySelector(".form-search"),p=document.querySelector(".gallery"),c=document.querySelector(".loader"),a=document.querySelector(".load-more");c.style.display="none";a.style.display="none";let m="",d=1;const y=15,u=new b(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),L=async r=>{if(r.preventDefault(),m=r.target.elements.user_query.value.trim(),d=1,p.innerHTML="",a.style.display="none",!m){l.show({backgroundColor:"#EF4040",message:"Enter the data for the search!",messageColor:"#FFFFFF",position:"topRight"});return}c.style.display="inline-block";try{const t=await f(m,d,y);if(t.hits.length===0){l.show({backgroundColor:"#EF4040",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",position:"topCenter"});return}p.insertAdjacentHTML("beforeend",g(t.hits)),u.refresh(),t.hits.length>=y&&(a.style.display="block")}catch(t){console.error(t.message),l.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topCenter",backgroundColor:"#EF4040",messageColor:"#FFFFFF"})}finally{c.style.display="none",r.target.reset()}},S=async()=>{d+=1,c.style.display="inline-block",a.style.display="none";try{const r=await f(m,d,y);if(r.hits.length===0){l.show({backgroundColor:"#EF4040",message:"No more images to load.",messageColor:"#FFFFFF",position:"topCenter"});return}p.insertAdjacentHTML("beforeend",g(r.hits)),u.refresh(),r.hits.length>=y&&(a.style.display="block")}catch(r){console.error(r.message),l.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topCenter",backgroundColor:"#EF4040",messageColor:"#FFFFFF"})}finally{c.style.display="none"}};E.addEventListener("submit",L);a.addEventListener("click",S);
//# sourceMappingURL=index.js.map
