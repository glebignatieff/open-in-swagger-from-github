function openInSwaggerButtonFromSibling(sibling) {
    let button = sibling.cloneNode()
    button.id = "open-in-swagger"
    button.textContent = "Open in Swagger"
    button.setAttribute("href", "https://editor.swagger.io/")
    return button
}

async function fetchFileContent(url) {
    const response = await fetch(url, {
        redirect: "follow"
    })
    return response.text()
}

function main() {
    let rawUrlBtn = document.getElementById("raw-url")
    let fileUrl = rawUrlBtn.attributes.href.textContent

    fetchFileContent(fileUrl)
        .then(fileContent => {
            if (!fileContent.startsWith("openapi")) {
                return
            }

            chrome.storage.local.set({ 'openapi': fileContent }, () => "file content saved")
            let openSwaggerBtn = openInSwaggerButtonFromSibling(rawUrlBtn)
            rawUrlBtn.parentElement.prepend(openSwaggerBtn)
        })
        .catch((error) => {
            console.error('Failed to fetch file content:', error);
        })
}

// TODO: use MutationObserver API to detect SPA route changes + wait for Raw button to appear
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
main()
