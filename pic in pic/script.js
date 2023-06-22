const videoE1=document.getElementById('video')
const btnRequest=document.getElementById('requestbtn')
const btnShare=document.getElementById('sharebtn')

btnRequest.addEventListener('click',()=>{
    selectMediaStream()
})

btnShare.addEventListener('click',async ()=>{
    btnShare.disabled=true
    await videoE1.requestPictureInPicture()
    btnShare.disabled=false
})

async function selectMediaStream(){     //ส่งrequstเข้าไปในอุปกรณ์
    try {
        const mediastream = await navigator.mediaDevices.getDisplayMedia()
        videoE1.srcObject=mediastream
        videoE1.onloadeddata=()=>{
            videoE1.onplay()
        }
    } catch (error) {
        console.log(error)
    }
}
