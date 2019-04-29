$(document).ready(function(){
	var myinput;
	
	$(".control-area").on('change input', '#control', function(){
		
		myinput = $('#control').val();
		if(myinput >= 0 && myinput <= 20){
			$('.control-area').find('.a').addClass('dsp-block').siblings().removeClass('dsp-block');
		}
		else if(myinput >= 21 && myinput <= 40){
			$('.control-area').find('.b').addClass('dsp-block').siblings().removeClass('dsp-block');
		}
		else if(myinput >= 41 && myinput <= 60){
			$('.control-area').find('.c').addClass('dsp-block').siblings().removeClass('dsp-block');
		}
		else if(myinput >= 61 && myinput <= 80){
			$('.control-area').find('.d').addClass('dsp-block').siblings().removeClass('dsp-block');
		}
		else{
			$('.control-area').find('.e').addClass('dsp-block').siblings().removeClass('dsp-block');
		}
		
	});
});
