(function(){
 'use strict';
 function target(hash){return /^#help-(mac|windows|illustrator|close)$/.test(hash)?document.getElementById(hash.slice(1)):null;}
 function reveal(){var el=target(location.hash);if(el)el.open=true;}
 addEventListener('hashchange',reveal);
 document.querySelectorAll('a[href^="#help-"]').forEach(function(a){a.addEventListener('click',function(event){var hash=a.getAttribute('href'),el=target(hash);if(!el)return;event.preventDefault();el.open=true;if(location.hash!==hash)history.pushState(null,'',hash);el.scrollIntoView({block:'start',behavior:'auto'});el.querySelector('summary').focus({preventScroll:true});});});
 reveal();
}());
