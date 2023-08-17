const noiseData = {
    ywrapb: 4,
    ywrap: 16,
    zwrapb: 8,
    size: 4095,
    octaves: 4,
    falloff: 0.55,
    perlin: undefined,
    iter: min(width, height)
}
const scaled_cosine = t => ((6*t - 15)*t + 10)*(t**3), 
noiseDetail = (o, f) => [noiseData.octaves, noiseData.falloff] = [o, f]
const p = noiseData
const noise = (x, y=0, z=0) => {
    //localize globals
    const random = Math.random, cos = Math.cos, PI = Math.PI
    
    //create variables
    let xi = x | 0, yi = y | 0, zi = z | 0, xf = x - xi, yf = y - yi, zf = z - zi, rxf, ryf, r = 0, ampl = 0.5, n1, n2, n3
    
    //create noise array
    if (!p.perlin) {
        const size = p.size + 1
        p.perlin = new Array(size)
        for(let i = size; i--;){
            p.perlin[i] = random()
        }
    }
    const perlin = p.perlin, size = p.size
    
    //fix some problems
    x < 0 && (x = -x)
    y < 0 && (y = -y)
    z < 0 && (z = -z)

    //compute noise
    for (let o = 0, l = p.octaves; o < l; o++) {
        let of = xi + (yi << p.ywrapb) + (zi << p.zwrapb), smoothed = t => ((6 * t - 15) * t + 10)* t * t * t
        rxf = smoothed(xf)
        ryf = smoothed(yf)
        n1 = perlin[of & p.size]
        n1 += rxf * (perlin[(of + 1) & size] - n1)
        n2 = perlin[(of + p.ywrap) & size]
        n2 += rxf * (perlin[(of + p.ywrap + 1) & size] - n2)
        n1 += ryf * (n2 - n1)

        of += p.zwrap
        n2 = p.perlin[of & size]
        n2 += rxf * (perlin[(of + 1) & size] - n2)
        n3 = perlin[(of + p.ywrap) & size]
        n3 += rxf * (perlin[(of + p.ywrap + 1) & size] - n3)
        n2 += ryf * (n3 - n2)

        n1 += 0.5 * (1 - cos(zf * PI)) * (n2 - n1)

        r += n1 * ampl
        ampl *= p.falloff
        xi <<= 1
        xf *= 2
        yi <<= 1
        yf *= 2
        zi <<= 1
        zf *= 2
        xf >= 1.0 && (xi++, xf--)
        yf >= 1.0 && (yi++, yf--)
        zf >= 1.0 && (zi++, zf--)
    }
    //return value
    return r
}
