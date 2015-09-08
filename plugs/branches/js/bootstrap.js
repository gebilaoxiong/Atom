/**
 * @authors       xiongyang
 * @email         gebilaoxiong@gmail.com
 * @date          2015-09-08 18:04:49
 * @description
 */
$.ajax({
  type:'get',
  url:'https://ajax.googleapis.com/ajax/services/search/images'
}).done(function(html){
  alert(html)
}).fail(function(error){
  alert(error.readyState)
})