$(document).ready(function () {
  let isModalPresent = false;
  const $askAiButton = $("#ask-ai-button");

  function updateModalState() {
    const $kapaContainer = $("#kapa-widget-container");

    if (!$kapaContainer.length || !$kapaContainer[0].shadowRoot) {
      return;
    }

    const shadowRoot = $kapaContainer[0].shadowRoot;
    const modalElement = shadowRoot.getElementById("kapa-modal-content");
    const exists = !!modalElement;

    if (exists && !isModalPresent) {
      isModalPresent = true;
      $askAiButton.attr("aria-expanded", "true");
    } else if (!exists && isModalPresent) {
      isModalPresent = false;
      $askAiButton.attr("aria-expanded", "false");
    }
  }

  setTimeout(function () {
    const $kapaContainer = $("#kapa-widget-container");

    if ($kapaContainer.length && $kapaContainer[0].shadowRoot) {
      $askAiButton.attr("aria-expanded", "false");
      updateModalState();

      const observer = new MutationObserver(updateModalState);
      observer.observe($kapaContainer[0].shadowRoot, {
        childList: true,
        subtree: true,
      });
    }
  }, 700);
});
