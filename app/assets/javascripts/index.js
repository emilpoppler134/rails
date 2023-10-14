/* on ready state */
document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    document.querySelector('.content').classList.remove('hidden')
  }
})

document.querySelectorAll(".change-status-button").forEach(btn => btn.addEventListener("click", onShowStatusList));

const status_item_buttons = document.querySelectorAll(".status-item-btn");
status_item_buttons.forEach(btn => {
  btn.addEventListener("click", onChangeStatus);
});

window.addEventListener("click", event => {
  if (!event.target.classList.contains("change-status-button")) {
    document.querySelectorAll(".status-container").forEach(container => {
      container.style.opacity = 0;
      container.style.pointerEvents = "none";
    });
    document.querySelectorAll(".change-status-button").forEach(button => {
      button.style.border = "none";
    });
  }
});

function onShowStatusList(event) {
  event.target.style.border = "3px dotted #7b7b7b";

  const status_list = event.target.closest(".item").querySelector(".status-container");
  status_list.style.opacity = 1;
  status_list.style.pointerEvents = "all";
}

async function onChangeStatus(event) {
  const status_ID = event.target.attributes["data-status_id"].value;
  const id = event.target.attributes["data-id"].value;

  const response = await fetch(`/tasks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCSRFToken(),
    },
    body: JSON.stringify({
      status_ID
    })
  });

  if (response.ok) {
    const data = await response.json();
    document.querySelector(`.change-status-button[data-id="${data.id}"]`).style.backgroundColor = data.status_color;
    document.querySelector(`.change-status-button[data-id="${data.id}"]`).innerHTML = data.status_name;
  } else {
    console.error('Failed to update task status');
  }
}

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}