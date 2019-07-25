type Mask = [number, number];

export function maskAreEqual(mask1: Readonly<Mask>, mask2: Readonly<Mask>): boolean
{
    var equal = mask1[0] === mask2[0] && mask1[1] === mask2[1];
    return equal;
}

export function maskIncludes(includingMask: Readonly<Mask>, includedMask: Readonly<Mask>): boolean
{
    var part0;
    var part1;
    var included =
    ((part0 = includedMask[0]) & includingMask[0]) === part0 &&
    ((part1 = includedMask[1]) & includingMask[1]) === part1;
    return included;
}

export function maskIntersection(mask1: Readonly<Mask>, mask2: Readonly<Mask>): Mask
{
    var mask: Mask = [mask1[0] & mask2[0], mask1[1] & mask2[1]];
    return mask;
}

export function maskIsEmpty(mask: Readonly<Mask>): boolean
{
    var empty = !(mask[0] | mask[1]);
    return empty;
}

export function maskNew(): Mask
{
    var mask: Mask = [0, 0];
    return mask;
}

export function maskUnion(mask1: Readonly<Mask>, mask2: Readonly<Mask>): Mask
{
    var mask: Mask = [mask1[0] | mask2[0], mask1[1] | mask2[1]];
    return mask;
}

export function maskWithBit(bitIndex: number): Mask
{
    var mask: Mask = [0, 0];
    mask[bitIndex >> 5] |= 1 << bitIndex;
    return mask;
}
