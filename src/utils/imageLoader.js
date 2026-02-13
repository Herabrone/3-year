// For public assets, we need to manually list them or use a different approach
// Since these are in the public folder, we reference them directly by path
const imageFilenames = [
  'original-702AD0DE-B3F6-4D21-A4EC-67FD33E54461.jpeg',
  'original-DEE77528-4CCA-4A3B-99E4-3186E830E739.jpeg',
  'processed-006792F2-5849-42D7-A8A7-A9CBB546115E.jpeg',
  'processed-15EBAFFB-1165-4AF5-B2B1-343086AF4E26.jpeg',
  'processed-167C069C-C55C-4ED6-A856-972B2C5BA329.jpeg',
  'processed-23584673-1874-499F-A93C-2AA81171415A.jpeg',
  'processed-2FA9FA0C-861B-4F55-B8D0-55667463D05E.jpeg',
  'processed-311A9CCC-1B98-4801-BD36-8765B7477859.jpeg',
  'processed-31FBE67F-8E72-46DC-8F94-BB782E83012B.jpeg',
  'processed-33D6B9FF-A675-4395-87F5-A6F28DC8D077.jpeg',
  'processed-3454BE0B-2A4F-4634-B133-39C1E0215C2B.jpeg',
  'processed-3C838C0F-984E-4946-B296-B5BB44022D72.jpeg',
  'processed-42B016A1-ED98-49EB-9B06-3071E774C114.jpeg',
  'processed-501E18D0-5A05-4DE0-AF91-09B005B2BD97.jpeg',
  'processed-7B2E8B5A-87DD-452F-91E1-DAF3D3B5AB06.jpeg',
  'processed-7D81ED92-7734-4404-A7D3-6740B27018A1.jpeg',
  'processed-7FFA43F5-AE83-4E38-AF65-CEC555C6F986.jpeg',
  'processed-8FC1F766-CBD4-4C7F-B735-688D5FCA7AE8.jpeg',
  'processed-95B90F33-823E-418D-9E8A-B2AC36D56D12.jpeg',
  'processed-9ACB83D5-941C-44F4-BA00-BC1D60F29FC1.jpeg',
  'processed-9F34FDEC-4700-456B-99D3-1C90C8A2A21C.jpeg',
  'processed-A0AA9748-5676-4358-BCDC-0354B5C1A938.jpeg',
  'processed-AA6495A2-BA62-4F80-9D9F-5DF48FA2A94E.jpeg',
  'processed-AE00839F-198C-4BCC-AF0F-FA0EEA17B68B.jpeg',
  'processed-AE5E3F62-1203-4FA9-AB15-AA468855E328.jpeg',
  'processed-B527E6F1-D241-45B5-A391-49DA4125A4D6.jpeg',
  'processed-B810551B-9981-4A02-97D7-191BDA45B254.jpeg',
  'processed-C3A5DC51-43D6-47CD-8928-8C3B4E4C8359.jpeg',
  'processed-CCC220CF-B452-4024-81B0-B4BA071DFB0A.jpeg',
  'processed-EBDE4B10-1345-4600-B848-9B33569CB231.jpeg',
  'processed-F92EA5D4-E5AD-44D5-9DBA-85639AF8A325.jpeg',
  'processed-FEAD2005-1583-4D3F-813E-F5A626F18D88.jpeg',
  'processed-FED7BDDD-02F4-4743-85CD-A87A7CB5D867.jpeg',
  'quail.jpg'
];

// Convert filenames to public URL paths (accounting for Vite base path)
// Use Vite's base URL so images resolve correctly when JS is served from
// the `/assets` folder (e.g. on GitHub Pages). `import.meta.env.BASE_URL`
// will be `/3-year/` in production and `/` in some dev setups.
export const allImages = imageFilenames.map(
  (filename) => `${import.meta.env.BASE_URL}images/${filename}`
);

/**
 * Returns a shuffled copy of all available images
 */
export function getShuffledImages() {
  const shuffled = [...allImages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}