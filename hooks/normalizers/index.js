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
	const normalizedDataMappedType = normalizedData.map(data => ({...data, type: name }))

	return normalizedDataMappedType;
};

export default normalizeData;