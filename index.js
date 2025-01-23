import{a as b,S as C,i as a}from"./assets/vendor-DEenWwFD.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const w="https://pixabay.com/api/",L="48245420-0c25989f875d1fe30dc45addb";async function p(t,e=1,n=15){try{return(await b.get(w,{params:{key:L,q:t.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:n}})).data}catch(s){throw console.error("Error fetching photos:",s.message),s}}function f(t){return t.map(({webformatURL:e,largeImageURL:n,tags:s="No tags",likes:o=0,views:r=0,comments:i=0,downloads:F=0})=>`<li class="gallery-item">
            <a class="gallery-link" href="${n}">
                <img class="gallery-image" src="${e}" alt="${s}" loading="lazy" />
            </a>
            <ul class="inform">
                <li class="inform-item">
                    <h2 class="inform-title">Likes:</h2>
                    <p class="inform-dan">${o}</p>
                </li>
                <li class="inform-item">
                    <h2 class="inform-title">Views:</h2>
                    <p class="inform-dan">${r}</p>
                </li>
                <li class="inform-item">
                    <h2 class="inform-title">Comments:</h2>
                    <p class="inform-dan">${i}</p>
                </li>
                <li class="inform-item">
                    <h2 class="inform-title">Downloads:</h2>
                    <p class="inform-dan">${F}</p>
                </li>
            </ul>
        </li>`).join("")}const E=document.querySelector(".form-search"),g=document.querySelector(".gallery"),c=document.querySelector(".loader"),l=document.querySelector(".load-more");c.style.display="none";l.style.display="none";let d="",m=1;const y=15;let u=0;const h=new C(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),S=async t=>{if(t.preventDefault(),d=t.target.elements.user_query.value.trim(),m=1,g.innerHTML="",l.style.display="none",!d){a.show({backgroundColor:"#EF4040",message:"Enter the data for the search!",messageColor:"#FFFFFF",position:"topRight"});return}c.style.display="inline-block";try{const e=await p(d,m,y);if(e.hits.length===0){a.show({backgroundColor:"#EF4040",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",position:"topCenter"});return}u=e.totalHits,g.insertAdjacentHTML("beforeend",f(e.hits)),h.refresh(),e.hits.length>=y&&(l.style.display="block"),a.show({backgroundColor:"#28a745",message:`Hooray! We found ${u} images.`,messageColor:"#FFFFFF",position:"topRight"})}catch(e){console.error(e.message),a.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topCenter",backgroundColor:"#EF4040",messageColor:"#FFFFFF"})}finally{c.style.display="none",t.target.reset()}},k=async()=>{m+=1,c.style.display="inline-block",l.style.display="none";try{const t=await p(d,m,y);if(t.hits.length===0){a.show({backgroundColor:"#EF4040",message:"No more images to load.",messageColor:"#FFFFFF",position:"topCenter"});return}g.insertAdjacentHTML("beforeend",f(t.hits)),h.refresh();const e=document.querySelector(".gallery .gallery-item");if(e){const{height:s}=e.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"})}document.querySelectorAll(".gallery .gallery-item").length>=u?(l.style.display="none",a.show({backgroundColor:"#EF4040",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FFFFFF",position:"topCenter"})):l.style.display="block"}catch(t){console.error(t.message),a.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topCenter",backgroundColor:"#EF4040",messageColor:"#FFFFFF"})}finally{c.style.display="none"}};E.addEventListener("submit",S);l.addEventListener("click",k);
//# sourceMappingURL=index.js.map
