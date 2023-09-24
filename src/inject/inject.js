function replaceElements() {
	chrome.storage.local.get(["savedURLPropertiesIDs", "savedClipboardPropertiesIDs", "savedHiddenPropertiesIDs"], function (result) {
		handleProperties(result.savedURLPropertiesIDs || [], "URLProperty");
		handleProperties(result.savedClipboardPropertiesIDs || [], "ClipboardProperty");
	});

	// Insert home link
	const homeLink = document.createElement("a")
	homeLink.innerText = "Home";
}

function handleProperties(ids, type) {
	ids.forEach(urlProperty => {
		if(urlProperty === "") { return }
		const elements = document.querySelectorAll("[data-test-id=" + urlProperty + "]");
		if(elements.length <= 0) { return }
		for (const element of elements) {
			if(type === "URLProperty") {
				handleURLProperty(element, urlProperty);
			}

			if(type === "ClipboardProperty") {
				handleClipboardProperty(element, urlProperty);
			}
		}
	})
}

function handleURLProperty(element, urlProperty) {
	const labels = element.getElementsByClassName("private-truncated-string__inner")
	const inputs = element.querySelectorAll("[data-selenium-test=property-input-" + urlProperty + "]");
	if (inputs && labels) {
		const firstInputURL = inputs[0].textContent;
		const firstLabelText = labels[0].textContent;
		const newLink = document.createElement("a")

		newLink.innerText = firstLabelText;
		newLink.href = firstInputURL;
		newLink.target = "_blank";
		newLink.classList.add("hubspot-url-property-button");
		element.replaceWith(newLink);
	}
}

function handleClipboardProperty(element, urlProperty) {
	const labels = element.getElementsByClassName("private-truncated-string__inner")
	const inputs = element.querySelectorAll("[data-selenium-test=property-input-" + urlProperty + "]");
	if (inputs && labels) {
		const firstInputText = inputs[0].textContent;
		const firstLabelText = labels[0].textContent;
		const newDiv = document.createElement("div")
		newDiv.innerText = firstInputText;
		newDiv.classList.add("hubspot-clipboard-property-div")
		element.replaceWith(newDiv);
	}
}

function handleHiddenProperty(element, urlProperty) {
	element.remove();
}

replaceElements();

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
	// Use traditional 'for loops' for IE 11
	for(const mutation of mutationsList) {
		replaceElements();
	}
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(document, config);