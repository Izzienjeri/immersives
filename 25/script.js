var padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = 500 - padding.left - padding.right,
  h = 500 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  oldpick = [],
  color = d3.scale.category20();

var data = [
  { label: "Persian Cat", value: 1, image: "cat1.jpg" },
  { label: "Orange Cat", value: 2, image: "cat2.jpg" },
  { label: "Street Cat", value: 3, image: "cat3.jpg" },
  { label: "Black Cat", value: 4, image: "cat4.jpg" },
  { label: "Chonky Cat", value: 5, image: "cat5.jpg" },
];

var svg = d3
  .select("#chart")
  .append("svg")
  .data([data])
  .attr("width", w + padding.left + padding.right)
  .attr("height", h + padding.top + padding.bottom);

var container = svg
  .append("g")
  .attr("class", "chartholder")
  .attr(
    "transform",
    "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
  );

var vis = container.append("g");

var pie = d3.layout
  .pie()
  .sort(null)
  .value(function (d) {
    return 1;
  });

var arc = d3.svg.arc().outerRadius(r);

var arcs = vis
  .selectAll("g.slice")
  .data(pie)
  .enter()
  .append("g")
  .attr("class", "slice");

arcs
  .append("path")
  .attr("fill", function (d, i) {
    return color(i);
  })
  .attr("d", function (d) {
    return arc(d);
  });

arcs
  .append("text")
  .attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return (
      "rotate(" +
      ((d.angle * 180) / Math.PI - 90) +
      ")translate(" +
      (d.outerRadius - 100) +
      ")"
    );
  })
  .attr("text-anchor", "end")
  .text(function (d, i) {
    return data[i].label;
  });

arcs
  .append("svg:image")
  .attr("xlink:href", function (d, i) {
    return data[i].image;
  })
  .attr("width", 80)
  .attr("height", 80)
  .attr("x", function (d) {
    const centroid = arc.centroid(d);
    return centroid[0] * 0.8 - 40;
  })
  .attr("y", function (d) {
    const centroid = arc.centroid(d);
    return centroid[1] * 0.8 - 40;
  })
  .attr("transform", function (d) {
    const centroid = arc.centroid(d);
    const scaledCentroid = [centroid[0] * 0.8, centroid[1] * 0.8];
    return "translate(" + scaledCentroid[0] + "," + scaledCentroid[1] + ")";
  });

container.on("click", spin);

function spin(d) {
  container.on("click", null);

  if (oldpick.length == data.length) {
    container.on("click", null);
    return;
  }

  var ps = 360 / data.length,
    rng = Math.floor(Math.random() * 1440 + 360);

  rotation = Math.round(rng / ps) * ps;

  picked = Math.round(data.length - (rotation % 360) / ps);
  picked = picked >= data.length ? picked % data.length : picked;

  rotation += 90 - Math.round(ps / 2);

  vis
    .transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function () {
      document.querySelector(
        "#cat-name h1"
      ).textContent = `You got ${data[picked].label}`;
      document.querySelector("#result-image").src = data[picked].image;
      document.querySelector("#result-image").alt = data[picked].label;
      oldrotation = rotation;
      container.on("click", spin);
    });
}

svg
  .append("g")
  .attr(
    "transform",
    "translate(" +
      (w + padding.left + padding.right) +
      "," +
      (h / 2 + padding.top) +
      ")"
  )
  .append("path")
  .attr("d", "M-" + r * 0.15 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
  .style({ fill: "black" });

container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 60)
  .style({ fill: "white", cursor: "pointer" });

container
  .append("text")
  .attr("x", 0)
  .attr("y", 15)
  .attr("text-anchor", "middle")
  .text("SPIN")
  .style({ "font-weight": "bold", "font-size": "30px" });

function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return "rotate(" + i(t) + ")";
  };
}
