function downloadFile(blob, mime, filename) {

    const downloadUrl = window.URL.createObjectURL(
        new Blob([blob], {type : mime || 'application/octet-stream'})
    );

    const link = document.createElement('a');

    link.href = downloadUrl;
    link.setAttribute('download', filename);
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    setTimeout(function() {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    }, 200)

}

export default downloadFile
