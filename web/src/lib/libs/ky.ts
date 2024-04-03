import { PUBLIC_API_URL } from '$env/static/public';
import lib from 'ky';

export const ky = lib.create({
	prefixUrl: PUBLIC_API_URL ?? '',
	timeout: false
});
