import React from "react";
import { connect, styled } from "frontity";
import Image from "@frontity/components/image";

const Logo = ({ state, id }) => {

  const site_setting = state.source.get(state.theme.settings_endpoint);

  if (!site_setting.isReady) return null;

  const logo = state.source.get("media/" + site_setting.logo_id);

  if (!logo.isReady) return null;

  const media = logo.data;

  

  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((item) => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;

  return (
    <Container>
      <LogoImage
        alt={media.title.rendered}
        src={media.source_url}
        srcSet=""
      />
    </Container>
  );
};

export default connect(Logo);

const Container = styled.div`

`;

const LogoImage = styled(Image)`
  z-index: 999;
  display: block;
  height: 60px;
  max-height: 60px;
  width: auto;
`;
