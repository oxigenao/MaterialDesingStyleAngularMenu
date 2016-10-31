/**
 * Created by willimbu on 30/10/16.
 */

/**
 * Created by Pablo on 02/10/2016.
 */

"use strict"
angular.module('mdmenuApp')


  .directive('navigation', ['$document', function($document) {
    return {
      templateUrl: '/views/templates/navTemplate.html',
      link: function () {

        var showButtonEl = document.querySelector('.js-menu-show');
        var hideButtonEl = document.querySelector('.js-menu-hide');
        var sideNavEl = document.querySelector('.js-side-nav');
        var sideNavContainerEl = document.querySelector('.js-side-nav-container');


        console.log(sideNavEl);

        var startX = 0;
        var  currentX = 0;
        var touchingSideNav = false;


        addEventListeners();

        function addEventListeners () {
          showButtonEl.addEventListener('click',showSideNav);
          hideButtonEl.addEventListener('click', hideSideNav);
          sideNavEl.addEventListener('click', hideSideNav);
          sideNavContainerEl.addEventListener('click', blockClicks);
          sideNavEl.addEventListener('touchstart', onTouchStart);
          sideNavEl.addEventListener('touchmove', onTouchMove);
          sideNavEl.addEventListener('touchend',onTouchEnd);

        }
 
        function onTouchStart (evt) {
          if (! sideNavEl.classList.contains('side-nav--visible'))
            return;
          startX = evt.touches[0].pageX;
          currentX =  startX;

          touchingSideNav = true;
          requestAnimationFrame( update);
        }

        function onTouchMove (evt) {
          if (! touchingSideNav)
            return;

          currentX = evt.touches[0].pageX;
          const translateX = Math.min(0,  currentX -  startX);

          if (translateX < 0) {
            evt.preventDefault();
          }
        }

        function onTouchEnd () {
          if (! touchingSideNav)
            return;

          touchingSideNav = false;

          const translateX = Math.min(0,  currentX -  startX);
          sideNavContainerEl.style.transform = '';

          if (translateX < 0) {
            hideSideNav();
          }
        }

        function update () {
          if (! touchingSideNav)
            return;

          requestAnimationFrame( update);

          const translateX = Math.min(0,  currentX -  startX);
          sideNavContainerEl.style.transform = 'translateX('+translateX+'px)';
        }

        function blockClicks (evt) {
          evt.stopPropagation();
        }

        function onTransitionEnd () {
          sideNavEl.classList.remove('side-nav--animatable');
          sideNavEl.removeEventListener('transitionend',  onTransitionEnd);
        }

        function showSideNav () {
          sideNavEl.classList.add('side-nav--animatable');
          sideNavEl.classList.add('side-nav--visible');

          sideNavEl.addEventListener('transitionend',  onTransitionEnd);
        }

        function  hideSideNav () {
          sideNavEl.classList.add('side-nav--animatable');
          sideNavEl.classList.remove('side-nav--visible');
          sideNavEl.addEventListener('transitionend',  onTransitionEnd);
        }

      }
    }
  }]);
