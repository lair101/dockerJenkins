var profile = (function(){

	return {
		resourceTags:{
			copyOnly: function(filename, mid){
				return true;
			},

			amd: function(filename, mid){
				return false;
			}
		}
	};
})();
