package com.inventorysystem.Backend.mapper;

import com.inventorysystem.Backend.dto.purchase.PurchaseArticleDTO;
import com.inventorysystem.Backend.dto.purchase.PurchaseDTO;
import com.inventorysystem.Backend.dto.purchase.PurchaseDetailDTO;
import com.inventorysystem.Backend.model.*;
import com.inventorysystem.Backend.repository.ArticleRepository;
import com.inventorysystem.Backend.repository.ProviderRepository;
import com.inventorysystem.Backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class PurchaseMapper {
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    ProviderRepository providerRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ArticleRepository articleRepository;

    @Autowired
    ProviderMapper providerMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    ArticleMapper articleMapper;

    public PurchaseDTO purchaseToDTO(Purchase purchase) {
        PurchaseDTO convertedPurchase = modelMapper.map(purchase, PurchaseDTO.class);

        Provider foundProvider = providerRepository.getProviderById(purchase.getProviderId());
        User foundUser = userRepository.getUserById(purchase.getUserId());

        convertedPurchase.setProvider(providerMapper.providerToDTO(foundProvider));
        convertedPurchase.setUser(userMapper.userToDTO(foundUser));

        return convertedPurchase;
    }

    public PurchaseArticleDTO purchaseArticleToDTO(PurchaseDetail purchaseDetail) {
        PurchaseArticleDTO convertedPurchaseDetail = modelMapper.map(purchaseDetail, PurchaseArticleDTO.class);

        Article foundArticle = articleRepository.getArticleById(purchaseDetail.getArticleId());
        convertedPurchaseDetail.setArticle(articleMapper.articleToDTO(foundArticle));

        return convertedPurchaseDetail;
    }

    public PurchaseDetailDTO purchaseDetailToDTO(Purchase purchase, List<PurchaseDetail> purchaseArticles) {
        // General information about the purchase
        PurchaseDetailDTO convertedPurchaseDetail = modelMapper.map(purchase, PurchaseDetailDTO.class);

        Provider foundProvider = providerRepository.getProviderById(purchase.getProviderId());
        User foundUser = userRepository.getUserById(purchase.getUserId());
        convertedPurchaseDetail.setProvider(providerMapper.providerToDTO(foundProvider));
        convertedPurchaseDetail.setUser(userMapper.userToDTO(foundUser));

        // Specific information about the purchase (details)
        List<PurchaseArticleDTO> purchaseArticleDetails = purchaseArticles.stream()
                .map(purArticle -> purchaseArticleToDTO(purArticle))
                .collect(Collectors.toList());
        convertedPurchaseDetail.setPurchaseArticles(purchaseArticleDetails);

        return convertedPurchaseDetail;
    }
}
