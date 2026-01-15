// lib/dictionary.ts
import 'server-only'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  bn: () => import('@/dictionaries/bn.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'bn') => {
  return locale === 'bn' ? dictionaries.bn() : dictionaries.en()
}