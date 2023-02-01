// open blob in new tab
function openBlob(blob, mime) {

    const fileUrl = window.URL.createObjectURL(
        new Blob([blob], {type : mime || 'application/octet-stream'})
    );

    window.open(fileUrl, '_blank', 'resizable=yes,scrollbars=yes,status=yes,width=800,height=600, top=30, left=30');
}

export default openBlob
