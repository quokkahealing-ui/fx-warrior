나는 어떤 FX 전사? - Netlify 배포용 폴더

- index.html : 테스트 페이지
- netlify/functions/results.mjs : 별명과 결과를 저장/불러오는 기능 (Netlify Blobs 사용)
- package.json, netlify.toml : Netlify 설정

주의: Netlify Drop(폴더 끌어다 놓기)으로 올리면 결과 저장 기능이 작동하지 않아요.
GitHub 저장소에 올린 뒤 Netlify에서 그 저장소를 연결하거나, Netlify CLI로 배포해 주세요.
