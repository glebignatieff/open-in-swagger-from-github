function pasteText(fileInput, text) {
    const file = new File([text], "openapi.yaml", { type: "text/yaml", lastModified: new Date().getTime() })
    let container = new DataTransfer()
    container.items.add(file)

    fileInput.files = container.files
    fileInput.dispatchEvent(new Event('change', { 'bubbles': true }))
}

function main() {
    let fileInput = document.querySelector('input[type="file"]')
    chrome.storage.local.get(["openapi"], (result) => {
        if (result.openapi !== undefined) {
            pasteText(fileInput, result.openapi)
            chrome.storage.local.remove(["openapi"])
        }
    })
}

window.addEventListener("load", main, false)
