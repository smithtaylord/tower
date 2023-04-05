import{_ as m,l as g,o as _,c as d,S as f,a as c,b as e,F as h,r as p,e as y,P as b,d as a,f as u,A as l,p as x,g as C,m as i,h as k}from"./index.3991eb46.js";const w={setup(){const o=g("");async function t(){try{await y.getEvents()}catch(r){b.error(r,"[error getting events]")}}return _(()=>{t()}),{events:d(()=>o.value?l.events.filter(r=>r.type==o.value):l.events),myTickets:d(()=>l.myTickets),changeFilterCategory(r){o.value=r}}},components:{SmEventCard:f}},S=o=>(x("data-v-fc06631a"),o=o(),C(),o),F={class:"container-fluid"},E=S(()=>e("div",{class:"row"},[e("div",{class:"col-12"},[e("div",{class:"m-3 p-3 bg-dark fancy-text fs-3 background-image blue-border tower-box-shadow text-info",style:{"background-image":"url(unsplash_kcJsQ3PJrYU.jpg)","background-size":"cover"}},[e("p",{class:"p-4"},[i("Get ahead of the scalpers. "),e("br"),i(" Reserve your seat now with "),e("br"),i(" real events for real people. ")])])])],-1)),P={class:"row"},I={class:"col-12"},A={class:"m-3 pt-2 bg-secondary rounded tower-box-shadow"},B={class:"row"},N={class:"col-6 col-md-2"},T={class:"col-6 col-md-2"},V={class:"col-6 col-md-2"},$={class:"col-6 col-md-2"},H={class:"col-6 col-md-2"},J={class:"col-6 col-md-2"},M={class:"row"},j={class:"col-12 col-md-3"};function z(o,t,r,s,D,G){const v=k("SmEventCard");return a(),c("div",F,[E,e("div",P,[e("div",I,[e("div",A,[e("div",B,[e("div",N,[e("h4",{onClick:t[0]||(t[0]=n=>s.changeFilterCategory("")),class:"fancy-hover text-center fancy-text fs-4 align-items-center p-3 bottom-border-hover"},"All")]),e("div",T,[e("h4",{onClick:t[1]||(t[1]=n=>s.changeFilterCategory("concert")),class:"text-center fancy-hover fancy-text fs-4 align-items-center p-3 bottom-border-hover"},"Concert ")]),e("div",V,[e("h4",{onClick:t[2]||(t[2]=n=>s.changeFilterCategory("convention")),class:"text-center fancy-hover fancy-text fs-4 align-items-center p-3 bottom-border-hover"}," Convention ")]),e("div",$,[e("h4",{onClick:t[3]||(t[3]=n=>s.changeFilterCategory("sport")),class:"text-center fancy-hover fancy-text fs-4 align-items-center p-3 bottom-border-hover"},"Sport ")]),e("div",H,[e("h4",{onClick:t[4]||(t[4]=n=>s.changeFilterCategory("digital")),class:"text-center fancy-hover fancy-text fs-4 align-items-center p-3 bottom-border-hover"},"Digital ")]),e("div",J,[e("h4",{onClick:t[5]||(t[5]=n=>s.changeFilterCategory("misc")),class:"text-center fancy-hover fancy-text fs-4 align-items-center p-3 bottom-border-hover"},"Misc. ")])])])])]),e("div",M,[(a(!0),c(h,null,p(s.events,n=>(a(),c("div",j,[u(v,{event:n},null,8,["event"])]))),256))])])}const Q=m(w,[["render",z],["__scopeId","data-v-fc06631a"]]);export{Q as default};