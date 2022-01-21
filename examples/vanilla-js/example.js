console.log("(example.js): BJN WebRTC Example");

navigator.mediaDevices._getUserMedia = navigator.mediaDevices.getUserMedia 
navigator.mediaDevices.getUserMedia = function(constraints) { console.log(constraints); return navigator.mediaDevices._getUserMedia.apply(null, arguments) }

var webrtcSDK = null;

initializeBJN = function() {
	console.log("(example.js) InitializeBJN()");

	webrtcSDK = new BJNWebClientSDK.BJNWebClientSDK()

	// Setup video elements
	webrtcSDK.meetingService.attachLocalVideo($("#localVideo")[0])
	webrtcSDK.meetingService.attachRemoteVideo($("#remoteVideo")[0])
	webrtcSDK.meetingService.attachRemoteContent($("#contentVideo")[0])
	
	// Observe SDK values
	webrtcSDK.meetingService.observe("videoState", updateRemoteVideoMask)
	webrtcSDK.meetingService.observe("audioMuted", updateAudioMuteButton)
	webrtcSDK.meetingService.observe("videoMuted", updateVideoMuteButton)
	webrtcSDK.meetingService.participantService.observe("participants", updateRoster)
	webrtcSDK.meetingService.contentService.observe("receivingContentShare", updateContentShare)
	webrtcSDK.audioDeviceService.observe("availableMicrophones", updateMicrophoneList)
	webrtcSDK.audioDeviceService.observe("availableSpeakers", updateSpeakerList)
	webrtcSDK.videoDeviceService.observe("availableCameras", updateCameraList)
	webrtcSDK.audioDeviceService.observe("selectedMicrophone", updateSelectedMicrophone)
	webrtcSDK.audioDeviceService.observe("selectedSpeaker", updateSelectedSpeaker)
	webrtcSDK.videoDeviceService.observe("selectedCamera", updateSelectedCamera)
	
	// Ask for permissions up front so that full device names are shown
	webrtcSDK.permissionService.requestAllPermissions().then(function(granted) {
		if (granted) {
			console.log("Permissions granted!")
		}

		// Show the self view pre-meeting
		webrtcSDK.meetingService.setSelfVideoPreviewEnabled(true)
	}, function(error) {
		console.log("Local device error " + error);
	});
}

// Begin SDK Listeners

function updateMicrophoneList() {
	$('#audioIn').empty()
	webrtcSDK.audioDeviceService.availableMicrophones.forEach( function(device) {
		$('#audioIn').append('<option value=' + device.id + '>' + device.name +'</option>');
	});
	updateSelectedMicrophone()
}

function updateSpeakerList() {
	$('#audioOut').empty()
	webrtcSDK.audioDeviceService.availableSpeakers.forEach(function(device) {
		$('#audioOut').append('<option value=' + device.id + '>' + device.name +'</option>');
	});
	updateSelectedSpeaker()
}

function updateCameraList() {
	$('#videoIn').empty()
	webrtcSDK.videoDeviceService.availableCameras.forEach(function(device) {
		$('#videoIn').append('<option value=' + device.id + '>' + device.name +'</option>');
	});
	updateSelectedCamera()
}

function updateSelectedMicrophone() {
	$('#audioIn').val(webrtcSDK.audioDeviceService.selectedMicrophone.id)
}

function updateSelectedSpeaker() {
	webrtcSDK.audioDeviceService.selectedSpeaker && $('#audioOut').val(webrtcSDK.audioDeviceService.selectedSpeaker.id)
}

function updateSelectedCamera() {
	$('#videoIn').val(webrtcSDK.videoDeviceService.selectedCamera.id)		
}

function updateRemoteVideoMask(){
	var videoState = webrtcSDK.videoState
	switch(videoState) {
		case BJNWebClientSDK.VideoState.INACTIVE_NEEDS_MODERATOR: // no one in mtg
			$("#remoteVideo").hide();
			$("#waitimg").hide();
			$("#waittext").hide();
			$("#wait4agent").show();
		break;
		case BJNWebClientSDK.VideoState.INACTIVE_ONLY_PARTICIPANT: // just me
			$("#remoteVideo").hide();
			$("#wait4agent").show();
			$("#waitimg").css('display','block').show();
			$("#waittext").show();
		break;
		default: // everyone
			$("#remoteVideo").show();
			$("#waitimg").hide();
			$("#waittext").hide();
			$("#wait4agent").hide();
		break;
	} 
}	

function updateRoster(){
	const participants = webrtcSDK.meetingService.participantService.participants
	$("#parties").empty()
	participants.forEach(function(p) {
		var r = '<tr">';
		r += "<td class='rostern'>" + 
			p.name + "</td>";
		r += "<td class='rosterv'>" + 
			videoMuteIcon(p)  +
			"</td>";
		r += "<td class='rostera'>" + 
			audioMuteIcon(p)  +
			"</td>";
		r += "</tr>";
		$("#parties").append(r);
	})
}

function updateAudioMuteButton() {
	var muted = webrtcSDK.meetingService.audioMuted
	var updatedText = muted ? "Unmute Audio" : "Mute Audio";
	$("#toggleAudioMute").html(updatedText);
	$("#toggleAudioMute").toggleClass("muted", muted);
	console.log(muted ? "Audio is Muted now" : "Audio is Unmuted now");	
};

function updateVideoMuteButton() {
	var muted = webrtcSDK.meetingService.videoMuted
	var updatedText = muted ? "Show Video" : "Mute Video";
	$("#toggleVideoMute").html(updatedText);
	$("#toggleAudioMute").toggleClass("muted", muted);
};

function updateContentShare(){
	if(webrtcSDK.meetingService.contentService.receivingContentShare){
		$("#contentVideo").show();
		$("#noContent").hide();
	} else {
		$("#contentVideo").hide();
		$("#noContent").show();
	}
}

// End SDK Listeners


function videoMuteIcon(p) {
	return (!p.isVideoMuted ? 
				"<img src='media/vcam.png'/>" :
				" ");
}
function audioMuteIcon(p) {
	return (!p.isAudioMuted ? 
				"<img src='media/mic.png'/>" :
				" ");
}

function listenForUIEvents () {

	// Device and Connection UI Handlers
	$("#audioIn").change( function() {
		var id = $("#audioIn").val()
		var device = webrtcSDK.audioDeviceService.availableMicrophones.find(function(device) { return device.id == id})
		console.log("UI: audio input changed: " + device.name);
		webrtcSDK.audioDeviceService.selectMicrophone(device)
	});

	$("#audioOut").change( function() {
		var id = $("#audioOut").val()
		var device = webrtcSDK.audioDeviceService.availableSpeakers.find(function(device) { return device.id == id})
		console.log("UI: audio output changed: " + device.name );
		webrtcSDK.audioDeviceService.selectSpeaker(device)
	});

	$("#videoIn").change( function() {
		var id = $("#videoIn").val()
		var device = webrtcSDK.videoDeviceService.availableCameras.find(function(device) { return device.id == id})
		console.log("UI: video input changed: " + device.name );
		webrtcSDK.videoDeviceService.selectCamera(device)
	});

	// Mute UI handlers
	$("#toggleAudioMute").click(function() {
		var muted = !webrtcSDK.meetingService.audioMuted
		webrtcSDK.meetingService.setAudioMuted(muted)
	});

	$("#toggleVideoMute").click(function() {
		var muted = !webrtcSDK.meetingService.videoMuted
		webrtcSDK.meetingService.setVideoMuted(muted)
	});

	// Meeting UI handlers
	$("#joinMeeting").click(function() {
		webrtcSDK.meetingService.joinMeeting($('#id').val(), $('#passCode').val(), $('#yourName').val()).then(function() {
			webrtcSDK.meetingService.setAudioMuted(false)
			webrtcSDK.meetingService.setVideoMuted(false)

			// Disable self video preview, so self view accurate reflects in-meeting mute state
			webrtcSDK.meetingService.setSelfVideoPreviewEnabled(false)
		});

		$(this).addClass("hidden");
		$(this).siblings().removeClass("hidden");
	});

	$("#leaveMeeting").click(function() {
		webrtcSDK.meetingService.endMeeting()

		$(this).addClass("hidden");
		$(this).siblings().removeClass("hidden");
	});
}

console.log("Starting Initialization of BJN");
initializeBJN();
listenForUIEvents();

