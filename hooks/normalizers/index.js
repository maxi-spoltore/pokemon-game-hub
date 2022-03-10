import { typeNormalizer } from './type';
import { generationNormalizer } from './generation';

const NORMALIZERS = {
  type: typeNormalizer,
  generation: generationNormalizer
}

const getNormalizer = name => {
	const normalizer = NORMALIZERS[name];
	return normalizer;
}

const normalizeData = (data, name) => {
	const normalize = getNormalizer(name);
	const normalizedData = normalize(data);

	return normalizedData;
};

export default normalizeData;