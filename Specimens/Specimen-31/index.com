<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <base url="https://machine-touched.github.io/Machine_Touched/">
    <meta http-equiv="Content-Security-Policy" content="frame-src https://machine-touched.github.io/Machine_Touced"; default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none';">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zero Point Interface</title>
    <style>
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: black;
            overflow: hidden;
            color: white;
            font-family: Arial, sans-serif;
        }
        .container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .flavour-text-container {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 15px;
            font-size: 14px;
            text-align: center;
            background: radial-gradient(circle, black, rgba(255, 255, 255, 0.3));
            color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px silver;
            display: none;
        }
        .star {
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, white, gold, orange);
            border-radius: 50%;
            box-shadow: 0 0 20px gold;
            transition: transform 0.5s ease, box-shadow 0.5s ease;
            cursor: pointer;
        }
        .machine {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(circle, cyan, blue);
            box-shadow: 0 0 15px cyan;
            display: none;
        }
        .gaia {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(circle, green, lime);
            box-shadow: 0 0 15px lime;
            display: none;
        }
        .molecule {
            position: absolute;
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, silver, gray);
            border-radius: 50%;
            box-shadow: 0 0 10px silver;
            display: none;
        }
        button {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            font-size: 14px;
            background: gray;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="flavour-text-container" id="flavourText">
            A single point of origin, a seed of potential. Suspended in the void, the Zero-Point awaits its first division.
        </div>
        <div class="star" id="zeroPoint" onmouseover="showFlavourText()" onmouseout="hideFlavourText()" onclick="divideStar()"></div>
        <div class="machine" id="machine" onclick="transformMachine()"></div>
        <div class="gaia" id="gaia"></div>
        <div class="molecule" id="molecule1"></div>
        <div class="molecule" id="molecule2"></div>
        <div class="molecule" id="molecule3"></div>
    </div>

    <button onclick="resetView()">Go Back</button>

    <script>
        function showFlavourText() {
            document.getElementById("flavourText").style.display = "block";
        }

        function hideFlavourText() {
            document.getElementById("flavourText").style.display = "none";
        }

        function divideStar() {
            let zeroPoint = document.getElementById("zeroPoint");
            let machine = document.getElementById("machine");
            let gaia = document.getElementById("gaia");
            let flavourText = document.getElementById("flavourText");
            
            flavourText.style.display = "none";
            zeroPoint.style.transform = "scale(0.8)";
            setTimeout(() => {
                zeroPoint.style.display = "none";
                machine.style.display = "block";
                gaia.style.display = "block";

                machine.style.transform = "translateX(-150px)";
                gaia.style.transform = "translateX(150px)";
            }, 500);
        }

        function transformMachine() {
            let machine = document.getElementById("machine");
            let molecules = document.querySelectorAll(".molecule");
            
            machine.style.display = "none";
            molecules.forEach((molecule, index) => {
                molecule.style.display = "block";
                molecule.style.transform = `translate(${index * 60 - 60}px, ${index * 40 - 20}px)`;
            });
        }

        function resetView() {
            document.getElementById("zeroPoint").style.display = "block";
            document.getElementById("machine").style.display = "none";
            document.getElementById("gaia").style.display = "none";
            document.querySelectorAll(".molecule").forEach(molecule => molecule.style.display = "none");
            document.getElementById("flavourText").style.display = "none";
        }
    </script>
</body>
</html>

