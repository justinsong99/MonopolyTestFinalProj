import Square from './monopoly-master/classicedition'

// No way to black-box test the Square class itself
// The following tests are for white-box branch coverage testing

test('Test basic property in group 3/4', () => {
    const sq = new Square("Baltic Avenue", "$60", "#8B4513", 60, 3, 4, 20, 60, 180, 320, 450)
    expect(sq.name).toBe("Baltic Avenue")
    expect(sq.pricetext).toBe("$60")
    expect(sq.color).toBe("#8B4513")
    expect(sq.houseprice).toBe(50)
})

test('Test basic property in group 5/6', () => {
    const sq = new Square("St. Charles Place", "$140", "#FF0080", 140, 5, 10, 50, 150, 450, 625, 750)
    expect(sq.price).toBe(140)
    expect(sq.groupNumber).toBe(5)
    expect(sq.baserent).toBe(10)
    expect(sq.houseprice).toBe(100)
})

test('Test basic property in group 7/8', () => {
    const sq = new Square("Kentucky Avenue", "$220", "#FF0000", 220, 7, 18, 90, 250, 700, 875, 1050)
    expect(sq.rent1).toBe(90)
    expect(sq.rent2).toBe(250)
    expect(sq.rent3).toBe(700)
    expect(sq.houseprice).toBe(150)
})

test('Test basic property in group 9/10', () => {
    const sq = new Square("Boardwalk", "$400", "#0000FF", 400, 10, 50, 200, 600, 1400, 1700, 2000)
    expect(sq.rent4).toBe(1700)
    expect(sq.rent5).toBe(2000)
    expect(sq.houseprice).toBe(200)
})

test('Test railroad/company/water works', () => {
    const sq = new Square("Reading Railroad", "$200", "#FFFFFF", 200, 1);
    expect(sq.groupNumber).toBeLessThan(3)
    expect(sq.owner).toBe(0)
    expect(sq.baserent).toBe(0)
    expect(sq.houseprice).toBe(0)
})

test('Test other cards with only name, pricetext, color', () => {
    const sq = new Square("Free Parking", "", "#FFFFFF");
    expect(sq.groupNumber).toBe(0)
    expect(sq.houseprice).toBe(0)
})

