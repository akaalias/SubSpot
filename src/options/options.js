document.addEventListener("DOMContentLoaded", function () {

    const savedURLPropertiesIDsInput = document.getElementById("savedURLPropertiesIDsInput");
    const savedClipboardPropertiesIDsInput = document.getElementById("savedClipboardPropertiesIDsInput");
    const savedHiddenPropertiesIDsInput = document.getElementById("savedHiddenPropertiesIDsInput");

    const saveOptionsButton = document.getElementById("saveOptions");

    // Load the saved classes from storage and populate the input field
    chrome.storage.local.get(["savedURLPropertiesIDs", "savedClipboardPropertiesIDs", "savedHiddenPropertiesIDs"], function (result) {
        const savedURLPropertiesIDs = result.savedURLPropertiesIDs || [];
        const savedClipboardPropertiesIDs = result.savedClipboardPropertiesIDs || [];
        const savedHiddenPropertiesIDs = result.savedHiddenPropertiesIDs || [];

        savedURLPropertiesIDsInput.value = savedURLPropertiesIDs.join("\n");
        savedClipboardPropertiesIDsInput.value = savedClipboardPropertiesIDs.join("\n");
        savedHiddenPropertiesIDsInput.value = savedHiddenPropertiesIDs.join("\n");
    });

    // Save the options when the "Save Options" button is clicked
    saveOptionsButton.addEventListener("click", function () {
        const savedURLPropertiesIDs = savedURLPropertiesIDsInput.value.split("\n").map(className => className.trim());
        const savedClipboardPropertiesIDs = savedClipboardPropertiesIDsInput.value.split("\n").map(className => className.trim());
        const savedHiddenPropertiesIDs = savedHiddenPropertiesIDsInput.value.split("\n").map(className => className.trim());

        chrome.storage.local.set({ "savedURLPropertiesIDs": savedURLPropertiesIDs });
        chrome.storage.local.set({ "savedClipboardPropertiesIDs": savedClipboardPropertiesIDs });
        chrome.storage.local.set({ "savedHiddenPropertiesIDs": savedHiddenPropertiesIDs });

        alert("Saved Options");
    });
});
