export const reduceTo22 = (num) => {
    if (!num || isNaN(num)) return 0;
    let result = Math.abs(num);
    while (result > 22) {
        result = String(result)
            .split('')
            .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return result;
};

export const calculateMainPoints = (birthDateString) => {
    const date = new Date(birthDateString);
    if (isNaN(date.getTime())) return null;

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const pointA = reduceTo22(day);
    const pointB = reduceTo22(month);
    const yearSum = String(year).split('').reduce((sum, d) => sum + parseInt(d), 0);
    const pointC = reduceTo22(yearSum);
    const pointD = reduceTo22(pointA + pointB + pointC);
    const pointX = reduceTo22(pointA + pointB + pointC + pointD);

    const pointE = reduceTo22(pointA + pointB);
    const pointF = reduceTo22(pointB + pointC);
    const pointG = reduceTo22(pointC + pointD);
    const pointH = reduceTo22(pointD + pointA);

    const pointSmallA = reduceTo22(pointA + pointX);
    const pointSmallB = reduceTo22(pointB + pointX);
    const pointSmallC = reduceTo22(pointC + pointX);
    const pointSmallD = reduceTo22(pointD + pointX);
    const pointSmallE = reduceTo22(pointE + pointX);
    const pointSmallF = reduceTo22(pointF + pointX);
    const pointSmallG = reduceTo22(pointG + pointX);
    const pointSmallH = reduceTo22(pointH + pointX);

    const pointAverA = reduceTo22(pointA + pointSmallA);
    const pointAverB = reduceTo22(pointB + pointSmallB);
    const pointAverC = reduceTo22(pointC + pointSmallC);
    const pointAverD = reduceTo22(pointD + pointSmallD);
    const pointAverE = reduceTo22(pointE + pointSmallE);
    const pointAverF = reduceTo22(pointF + pointSmallF);
    const pointAverG = reduceTo22(pointG + pointSmallG);
    const pointAverH = reduceTo22(pointH + pointSmallH);

    const pointHrtM = reduceTo22(pointSmallD + pointSmallC);
    const pointHrtN = reduceTo22(pointSmallD + pointHrtM);
    const pointHrtO = reduceTo22(pointSmallC + pointHrtM);

    const socialPoint = reduceTo22(pointE + pointF + pointG + pointH);
    const spiritPoint = reduceTo22(pointX + socialPoint);

    const pointWomen = reduceTo22(pointX + pointSmallA);
    const pointMen = reduceTo22(pointX + pointSmallB);

    const results = {
        pointA, pointB, pointC, pointD, pointE,
        pointF, pointG, pointH, pointX,
        pointSmallA, pointSmallB, pointSmallC, pointSmallD,
        pointSmallE, pointSmallF, pointSmallG, pointSmallH,
        pointAverA, pointAverB, pointAverC, pointAverD,
        pointAverE, pointAverF, pointAverG, pointAverH,
        pointHrtM, pointHrtN, pointHrtO, socialPoint,
        spiritPoint, pointWomen, pointMen
    };

    const circleNodes = [pointA, pointE, pointB, pointF, pointC, pointG, pointD, pointH];
    const peripheral = new Array(80).fill(0);

    for (let i = 0; i < circleNodes.length; i++) {
        const start = circleNodes[i];
        const end = circleNodes[(i + 1) % circleNodes.length];
        const baseIdx = i * 10;

        const p5 = reduceTo22(start + end);
        const p25 = reduceTo22(start + p5);
        const p75 = reduceTo22(p5 + end);
        const p12 = reduceTo22(start + p25);
        const p37 = reduceTo22(p25 + p5);
        const p62 = reduceTo22(p5 + p75);
        const p87 = reduceTo22(p75 + end);

        peripheral[baseIdx] = start;

        peripheral[baseIdx + 2] = p12;
        peripheral[baseIdx + 3] = p25;
        peripheral[baseIdx + 4] = p37;
        peripheral[baseIdx + 5] = p5;
        peripheral[baseIdx + 6] = p62;
        peripheral[baseIdx + 7] = p75;
        peripheral[baseIdx + 8] = p87;
    }

    results.peripheral = peripheral;

    return results;
};