import{_ as k,o as g,c as r,S as f,T as S,a as c,b as t,F as _,r as l,e as E,P as v,t as T,d as o,f as u,A as n,p as w,g as C,h as p}from"./index.2c9fa8d4.js";const x={setup(){async function e(){try{await E.getEvents()}catch(s){v.error(s,"[error getting events]")}}async function i(){try{await T.getMyTickets()}catch(s){v.error(s,"[get my tickets]")}}return g(()=>{i(),e()}),{account:r(()=>n.account),myTickets:r(()=>n.myTickets),myEvents:r(()=>n.events.filter(s=>s.creator.id==n.account.id))}},components:{SmEventCard:f,TicketCard:S}},m=e=>(w("data-v-4868e58d"),e=e(),C(),e),A={class:""},I={class:"container-fluid"},M={class:"row"},P={class:"col-12"},B=m(()=>t("h3",{class:"text-success p-3 mt-3"}," My Events",-1)),F={class:"row scroll-y"},N={class:"col-3"},V={class:"container-fluid"},$={class:"row"},b={class:"col-12"},L=m(()=>t("h3",{class:"text-success mt-5 p-3"},"Upcoming events",-1)),U={class:"row"},j={class:"col-9 m-auto"};function q(e,i,s,d,z,D){const h=p("SmEventCard"),y=p("TicketCard");return o(),c("div",A,[t("div",I,[t("div",M,[t("div",P,[B,t("div",F,[(o(!0),c(_,null,l(d.myEvents,a=>(o(),c("div",N,[u(h,{event:a},null,8,["event"])]))),256))])])])]),t("div",V,[t("div",$,[t("div",b,[L,t("div",U,[(o(!0),c(_,null,l(d.myTickets,a=>(o(),c("div",j,[u(y,{ticket:a},null,8,["ticket"])]))),256))])])])])])}const H=k(x,[["render",q],["__scopeId","data-v-4868e58d"]]);export{H as default};
