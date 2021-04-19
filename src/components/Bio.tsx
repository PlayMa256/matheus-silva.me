import React from "react"
import Image from 'next/image';
import config from './config';
import styled from 'styled-components';

const Wrapper = styled.div`
	margin-top: 10px;
	display: flex;
	> div:first-child {
		margin-right: 20px !important;
	}

	p {
		margin-bottom: 0;
	}
	.image-wrapper {
		border-radius: 50%;
		margin: 0 20px 0 0;
	}

`;

const Bio = () => {
	return (
		<Wrapper>
			<Image
				className={'image-wrapper'}
				alt={config.author.name}
				src={"/profile-pic.jpg"}
				layout={'fixed'}
				width={90}
				height={90}
			/>
			<p>
				Written by <strong>{config.author.name}</strong> {config.author.summary}
				{` `}
				<a href={`https://twitter.com/${config.social.twitter}`}>
					You should follow him on Twitter
        </a>
			</p>
		</Wrapper>
	)
}

export default Bio
