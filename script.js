var ref = new Firebase("https://themrwishwush2022-default-rtdb.firebaseio.com/");

function timeStamp() {
  var now = new Date();
  var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
  var time = [now.getHours(), now.getMinutes()];
  var suffix = (time[0] < 12) ? "AM" : "PM";
  time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

  for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }

  return date.join("/") + ", " + time.join(":") + " " + suffix;
}

function postComment() {
  var comment = document.getElementById("comment").value,
      time = timeStamp();

  if (comment) {
    ref.push({
      comment: comment,
      time: time
    });
  }
  document.getElementById("comment").value = '';
}

ref.on("child_added", function(snapshot) {
  var comment = snapshot.val();
  addComment(comment.comment, comment.time);
});

function addComment(comment, timeStamp) {
  var comments = document.getElementById("comments");
  comments.innerHTML = "<span>" + timeStamp + "</span></h4><p>" + comment + "</p>" + comments.innerHTML;
}