// Video and audio selectors
const video = document.querySelector('video');
const audio = document.querySelector('audio');

// Video and Mic Toggle btns
const mediaToggle = document.querySelectorAll('.stream__media-control');

mediaToggle.forEach((media) => {
    // Video and Mic toggle labels and spans inside the tag
    let mediaLabel = media.querySelector('label')
    let mediaLabelSpan = media.querySelector('span')

    // Video and Mic toggle click event
    mediaLabel.addEventListener('click', function () {
        mediaLabelSpan.classList.toggle('active');
        if (mediaLabel.getAttribute('for') == 'video-toggle') {
            stream.getTracks().forEach(function (track) {
                if (track.kind === 'video') {
                    if (!mediaLabelSpan.classList.contains('active')) {
                        track.enabled = false;
                        console.log('video stopped', track);
                    } else {
                        track.enabled = true;
                        console.log('video started', track);
                    }
                }
            });
        } else if (mediaLabel.getAttribute('for') == 'audio-toggle') {
            stream.getTracks().forEach(function (track) {
                if (track.kind === 'audio') {
                    micTrack = track
                    if (!mediaLabelSpan.classList.contains('active')) {
                        track.enabled = false;
                        console.log('audio stopped', track);
                    } else {
                        track.enabled = true;
                        console.log('audio started', track);
                    }
                }
            });
        }
    })
})

// Getting Audio and Video permissions
navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    })
    .then(stream => {
        window.localStream = stream;
        video.srcObject = stream;
        audio.srcObject = stream;
    })
    .catch((err) => {
        console.log(err);
    });

// Media Devices Setting Toggle
const cameraPageBody = document.querySelector('.camera-page-body')
const mediaSettingToggleBtn = document.querySelector('.mediaSettingsToggle')
const mediaSettingCloseBtn = document.querySelector('.settings__close')
const mediaSettingOverlay = document.querySelector('.settingsOverlay')
const mediaSetting = document.querySelector('.settings')

mediaSettingToggleBtn.addEventListener('click', () => {
    mediaSetting.classList.add('active')
    mediaSettingOverlay.classList.add('active')
    cameraPageBody.classList.add('no-scroll')
})
mediaSettingCloseBtn.addEventListener('click', () => {
    mediaSetting.classList.remove('active')
    mediaSettingOverlay.classList.remove('active')
    cameraPageBody.classList.remove('no-scroll')
})

// Function To Changename of header on right col 1
const conferenceRtSdName = (name) => {
    document.querySelector('.conference-rside-name').textContent = name
}


// Function To remove Active classes from all col-1 childrens
const rmActiveFromColsChildren = () => {
    Array.from(document.querySelector('.conference-col-1').children).forEach(el => el.classList.contains('active') && el.classList.remove('active'))
}
// Chat Btn for chat window toggle
const conferenceChatBtn = document.querySelectorAll('.conferenceChatBtn')
const conferenceChat = document.querySelector('.conference__chat')

conferenceChatBtn.forEach(btn => btn.addEventListener('click', _ => {
    conferenceRtSdName('Group Chat')
    rmActiveFromColsChildren()
    conferenceChat.classList.add('active')
}))

// Info Btn for info window toggle
const conferenceInfoBtn = document.querySelectorAll('.conferenceInfoBtn')
const conferenceInfo = document.querySelector('.conference__info')

conferenceInfoBtn.forEach(btn => btn.addEventListener('click', _ => {
    conferenceRtSdName('Info')
    rmActiveFromColsChildren()
    conferenceInfo.classList.add('active')
}))

// Copy Meet code in Info Settings
const meetCode = document.querySelector('#codeMeetJoin')
const meetCodeUrl = document.querySelector('#codeMeetJoin')
const meetCodeCopyBtn = document.querySelector('#meetInfoCopyBtn')

meetCodeCopyBtn.addEventListener('click', () => {

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(meetCodeUrl.textContent);

    /* Toast Initialize */
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl)
    });
    toastList.forEach(toast => toast.show()); // This show them
})

// Conference Focus Toggle
const conferenceFocusBtn = document.querySelector('#conferenceFocusBtn')
const conferenceHeader = document.querySelector('.conference__heading')
const col_2 = document.querySelector('.conference-col-2')
const col_1 = document.querySelector('.conference-col-1')

conferenceFocusBtn.addEventListener('click', () => {
    // Adding and removing focusIn & focusOut class to identify the action of focus or focusOut
    if (conferenceFocusBtn.classList.contains('focusIn')) {
        conferenceFocusBtn.classList.add('focusOut')
        conferenceFocusBtn.classList.remove('focusIn')
        // Expand & Collapse of Conferernce Header
        conferenceHeader.classList.remove('expand')
        // Expand and Collapse of Cols
        col_2.classList.add('expand')
        col_1.classList.remove('expand')
    } else if (conferenceFocusBtn.classList.contains('focusOut')) {
        conferenceFocusBtn.classList.remove('focusOut')
        conferenceFocusBtn.classList.add('focusIn')
        // Expand & Collapse of Conferernce Header
        conferenceHeader.classList.add('expand')
        // Expand and Collapse of Cols
        col_2.classList.remove('expand')
        col_1.classList.add('expand')
    }
})